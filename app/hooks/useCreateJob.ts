import { useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookies";

export interface CreateJobPayload {
  title: string;
  description: string;
  requirements: string;
  skillIds: number[];
  employmentType: string;
  workModel: string;
  city: string;
  state: string;
  country: string;
  salaryMin: number;
  salaryMax: number;
  equityMin: number;
  equityMax: number;
  status: string;
}

export function useCreateJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createJob = async (payload: CreateJobPayload) => {
    setLoading(true);
    setError("");
    try {
      const token = getCookie("token");

      await axios.post("http://localhost:8000/api/jobs/create", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      return true; // Success
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create job posting");
      return false; // Error
    } finally {
      setLoading(false);
    }
  };

  return { createJob, loading, error, setError };
}
