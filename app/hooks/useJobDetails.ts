import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookies";

export interface JobDetails {
  jobPostingId: number;
  publicId: string;
  startupId: number;
  startupName: string;
  title: string;
  description: string;
  requirements: string;
  skills: string[];
  employmentType: string;
  workModel: string;
  city: string;
  state: string;
  country: string;
  salaryMin: number;
  salaryMax: number;
  equityMin: number;
  equityMax: number;
  jobStatus: string;
  createdAt: string;
}

export interface StartupDetails {
  companyName: string;
  description: string;
  industry: string;
  stage: string;
  foundedDate: string;
  size: string;
  logoUrl: string;
  websiteUrl: string;
  linkedinUrl: string;
  city: string;
  state: string;
  country: string;
  cnpj: string;
}

export function useJobDetails(id: string | string[] | undefined) {
  const [job, setJob] = useState<JobDetails | null>(null);
  const [startup, setStartup] = useState<StartupDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = getCookie("token");
        const headers = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        // Fetch Job Details using publicId (UUID)
        const jobResponse = await axios.get(`http://localhost:8000/api/jobs/${id}`, { headers });
        const jobData = jobResponse.data;
        setJob(jobData);

        // 2. Fetch Startup Details
        if (jobData.startupId) {
          const startupResponse = await axios.get(`http://localhost:8000/api/startups/${jobData.startupId}`, { headers });
          setStartup(startupResponse.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { job, startup, loading, error };
}
