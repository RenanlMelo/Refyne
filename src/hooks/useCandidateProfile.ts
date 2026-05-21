import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { useAuthContext } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";

export function useCandidateProfile() {
  const router = useRouter();
  const { refreshUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  // Profile Fields
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("OPEN_TO_WORK");
  const [cpf, setCpf] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [cpfError, setCpfError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setFullNameError("");
    setCpfError("");

    let valid = true;
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      valid = false;
    }
    if (!cpf.trim()) {
      setCpfError("CPF is required");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    try {
      let finalResumeData = "";

      if (resumeFile) {
        // Convert file to base64 for JSON submission
        finalResumeData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(resumeFile);
        });
      }

      const formData = new FormData();

      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              fullName,
              headline,
              bio,
              city,
              state: addressState,
              country,
              linkedinUrl,
              portfolioUrl,
              githubUrl,
              availabilityStatus,
              cpf
            }),
          ],
          {
            type: "application/json",
          }
        )
      );

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const token = getCookie("token");

      const response = await axios.post(
        `${API_BASE_URL}/api/candidates/create`,
        formData,
        {
          headers: {
            ...(token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
        }
      );

      // Refresh user context so AuthGuard sees profileCompleted: true
      await refreshUser();
      router.push("/home");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMSG("This CPF is already registered.");
      } else {
        setErrorMSG(err.response?.data?.message || err.message || "Server connection error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      fullName, fullNameError,
      cpf, cpfError,
      headline, bio,
      city, addressState, country,
      profilePhoto, resumeFile,
      linkedinUrl, portfolioUrl, githubUrl,
      availabilityStatus,
      loading, errorMSG
    },
    actions: {
      setFullName, setCpf, setHeadline, setBio,
      setCity, setAddressState, setCountry,
      setProfilePhoto, setResumeFile,
      setLinkedinUrl, setPortfolioUrl, setGithubUrl,
      setAvailabilityStatus,
      handleSubmit,
      setFullNameError,
      setCpfError
    }
  };
}
