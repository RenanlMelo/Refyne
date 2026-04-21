import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

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
        const response = await axios.post("http://localhost:8000/api/auth/create", {
          email: email,
          password: password,
          userType: userType === "candidato" ? "CANDIDATE" : "STARTUP",
        });

        const data = response.data;
        // Save token immediately so the user stays authenticated
        console.log(data)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (userType === "candidato") {
          router.push("/auth/candidate");
        } else {
          router.push("/auth/startup");
        }
      } else {
        // LOGIN
        const response = await axios.post("http://localhost:8000/api/auth/login", {
          email: email,
          password: password,
          userType: userType === "candidato" ? "CANDIDATE" : "STARTUP",
        });

        const data = response.data;

        // Save token and user info BEFORE navigating
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("profileCompleted", data.profileCompleted);

        if (data.profileCompleted === false) {
          if (data.userType === "CANDIDATE") {
            router.push("/auth/candidate");
          } else {
            router.push("/auth/startup");
          }
        } else {
          router.push("/home");
        }
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMSG("This E-mail is already registered.");
      } else if (err.response?.status === 401 || err.response?.status === 400) {
        setErrorMSG("Invalid email or password.");
      } else {
        setErrorMSG(err.response?.data?.message || err.message || "Server connection error.");
      }
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
