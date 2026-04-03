import { useState } from "react";
import { useRouter } from "next/navigation";

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

      const response = await fetch("http://localhost:8000/api/candidates/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error finishing registration.");
      router.push("/home");
    } catch (err: any) {
      setErrorMSG(err.message || "Server connection error.");
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
