import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useStartupProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  // Profile Fields based on STARTUP table
  const [companyName, setCompanyName] = useState(""); // company_name
  const [description, setDescription] = useState(""); // description
  const [industry, setIndustry] = useState(""); // industry
  const [stage, setStage] = useState(""); // stage
  const [foundedDate, setFoundedDate] = useState(""); // founded_date
  const [size, setSize] = useState(""); // size
  const [logoFile, setLogoFile] = useState<File | null>(null); // logo_url (base64)
  const [websiteUrl, setWebsiteUrl] = useState(""); // website_url
  const [linkedinUrl, setLinkedinUrl] = useState(""); // linkedin_url
  const [city, setCity] = useState(""); // city
  const [addressState, setAddressState] = useState(""); // state
  const [country, setCountry] = useState(""); // country
  const [cnpj, setCnpj] = useState(""); // cnpj

  const [companyNameError, setCompanyNameError] = useState("");
  const [cnpjError, setCnpjError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setCompanyNameError("");
    setCnpjError("");

    let valid = true;
    if (!companyName.trim()) {
      setCompanyNameError("Company name is required");
      valid = false;
    }
    if (!cnpj.trim()) {
      setCnpjError("CNPJ is required");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      let finalLogoData = "";

      if (logoFile) {
        // Convert logo to base64 for submission
        finalLogoData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(logoFile);
        });
      }

      const payload = {
        companyName,
        description,
        industry,
        stage,
        foundedDate,
        size,
        logoUrl: finalLogoData,
        websiteUrl,
        linkedinUrl,
        city,
        state: addressState,
        country,
        cnpj
      };

      console.log("Submitting Startup Profile Payload:", payload);

      const token = localStorage.getItem("token");

      console.log("TOKEN: " + token)

      const response = await axios.post("http://localhost:8000/api/startups/create", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = response.data;
      console.log("TESTE: " + data.message);

      router.push("/home");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorMSG("This CNPJ is already registered.");
      } else {
        setErrorMSG(err.response?.data?.message || err.message || "Server connection error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      companyName, companyNameError,
      cnpj, cnpjError,
      description, industry, stage, foundedDate, size,
      logoFile, websiteUrl, linkedinUrl,
      city, addressState, country,
      loading, errorMSG
    },
    actions: {
      setCompanyName, setCnpj, setDescription, setIndustry,
      setStage, setFoundedDate, setSize,
      setLogoFile, setWebsiteUrl, setLinkedinUrl,
      setCity, setAddressState, setCountry,
      handleSubmit
    }
  };
}
