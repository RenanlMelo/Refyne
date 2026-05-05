import { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "./useLatestJobs";
import { getCookie } from "../utils/cookies";

export function useStartupJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getCookie("token");
      const response = await axios.get("http://localhost:8000/api/jobs/my-jobs", {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      console.log("API RESPONSE:", response.data);

      let rawJobs = [];
      const data = response.data;
      if (Array.isArray(data)) {
        rawJobs = data;
      } else if (data && Array.isArray(data.data)) {
        rawJobs = data.data;
      }

      const mappedJobs: Job[] = rawJobs.map((apiJob: any) => {
        const companyName = apiJob.startupName || "Company";

        let salaryStr = "A combinar";
        if (apiJob.salaryMin && apiJob.salaryMax && apiJob.salaryMin !== apiJob.salaryMax) {
          salaryStr = `R$ ${(apiJob.salaryMin / 1000).toFixed(0)}k – ${(apiJob.salaryMax / 1000).toFixed(0)}k`;
        } else if (apiJob.salaryMin && apiJob.salaryMin === apiJob.salaryMax) {
          salaryStr = `R$ ${(apiJob.salaryMin / 1000).toFixed(0)}k (Exato)`;
        } else if (apiJob.salaryMin) {
          salaryStr = `A partir de R$ ${(apiJob.salaryMin / 1000).toFixed(0)}k`;
        } else if (apiJob.exactSalary) {
          salaryStr = `R$ ${(apiJob.exactSalary / 1000).toFixed(0)}k (Exato)`;
        }

        const formatEnum = (str?: string) => {
          if (!str) return "";
          return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('-');
        };

        const workModel = formatEnum(apiJob.workModel);
        const employmentType = formatEnum(apiJob.employmentType);

        const locationParts = [apiJob.city, apiJob.state, apiJob.country].filter(Boolean).join(", ");
        const locationStr = [locationParts, workModel].filter(Boolean).join(" · ");

        let equityStr = "";
        if (apiJob.equityMin !== undefined && apiJob.equityMax !== undefined && apiJob.equityMin > 0 && apiJob.equityMin !== apiJob.equityMax) {
          equityStr = `${apiJob.equityMin}% – ${apiJob.equityMax}% equity`;
        } else if (apiJob.equityMin !== undefined && apiJob.equityMin === apiJob.equityMax && apiJob.equityMin > 0) {
          equityStr = `${apiJob.equityMin}% equity`;
        } else if (apiJob.equityMin !== undefined && apiJob.equityMin > 0) {
          equityStr = `${apiJob.equityMin}% equity`;
        }

        const extractedSkills = Array.isArray(apiJob.skills)
          ? apiJob.skills.map((s: any) => typeof s === 'string' ? s : s.skill?.name || s.name || "Skill")
          : [];

        return {
          id: apiJob.jobPostingId || Math.random(),
          publicId: apiJob.publicId || "",
          title: apiJob.title || "Job",
          company: companyName,
          stage: "",
          logo: companyName.charAt(0).toUpperCase() || "C",
          logoColor: "#CC97FF",
          logoBg: "#1a1030",
          location: locationStr || "Remote",
          salary: salaryStr,
          type: employmentType || "Full-time",
          equity: equityStr,
          tags: [workModel, employmentType].filter(Boolean),
          posted: apiJob.createdAt ? new Date(apiJob.createdAt).toLocaleDateString() : "Recent",
          match: 100,
          hot: apiJob.jobStatus === "OPEN",
          saved: false,
          description: apiJob.description || "",
          requirements: apiJob.requirements || "",
          skills: extractedSkills,
        };
      });

      setJobs(mappedJobs);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load your jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, loading, error, setJobs, refetch: fetchJobs };
}
