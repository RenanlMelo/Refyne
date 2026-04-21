import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useCandidateProfile() {
  const router = useRouter();
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

      const payload = {
        fullName: fullName,
        headline,
        bio,
        city,
        state: addressState,
        country,
        profilePhoto: profilePhoto,
        resumeUrl: finalResumeData, // Sending base64 string
        linkedinUrl: linkedinUrl,
        portfolioUrl: portfolioUrl,
        githubUrl: githubUrl,
        availabilityStatus: availabilityStatus,
        cpf
      };

      console.log("Submitting Profile Payload:", payload);

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:8000/api/candidates/create", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

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
