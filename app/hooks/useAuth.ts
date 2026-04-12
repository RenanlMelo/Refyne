import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type UserType = "candidato" | "startup" | null;
type SocialProvider = "github" | "google" | "linkedin";

export function useAuth() {
  const router = useRouter();

  // Auth mode
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  // Field errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Validation (internal)
  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  const handleSocialLogin = async (provider: SocialProvider) => {
    setSocialLoading(provider);
    setErrorMSG("");
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      setErrorMSG(`Error connecting to ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      if (!isLogin) {
        // SIGN UP
        const response = await fetch("http://localhost:8000/api/auth/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            userType: userType === "candidato" ? "CANDIDATE" : "STARTUP",
          }),
        });

        if (!response.ok) throw new Error("Error creating user.");

        if (userType === "candidato") {
          router.push("/auth/candidate");
        } else {
          router.push("/auth/startup");
        }
      } else {
        // LOGIN
        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            userType: userType === "candidato" ? "CANDIDATE" : "STARTUP",
          })
        });

        if (!response.ok) throw new Error("Invalid email or password.");

        const data = await response.json();
        console.log(data);

        router.push("/home");
        localStorage.setItem("token", data.token);
      }
    } catch (err: any) {
      setErrorMSG(err.message || "Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    state: {
      isLogin,
      userType,
      email,
      password,
      confirmPassword,
      showPassword,
      loading,
      errorMSG,
      socialLoading,
      emailError,
      passwordError,
      confirmPasswordError,
    },
    actions: {
      setIsLogin,
      setUserType,
      setEmail,
      setPassword,
      setConfirmPassword,
      toggleShowPassword,
      setErrorMSG,
      setEmailError,
      setPasswordError,
      setConfirmPasswordError,
      handleSubmit,
      handleSocialLogin,
    },
  };
}
