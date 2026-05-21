"use client";

import { useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { API_BASE_URL } from "@/utils/api";

export interface ApplicationRequest {
  publicId: string;
  coverLetter?: string;
  resume?: File | string | null;
}

export function useApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const applyToJob = async ({ publicId, coverLetter, resume }: ApplicationRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      
      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              jobPublicId: publicId,
              coverLetter: coverLetter || "",
              resumeUrl: typeof resume === 'string' ? resume : null
            }),
          ],
          {
            type: "application/json",
          }
        )
      );

      if (resume && typeof resume !== 'string') {
        formData.append("resume", resume as File);
      }

      const token = getCookie("token");

      const response = await axios.post(`${API_BASE_URL}/api/applications/apply`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        return response.data;
      }
    } catch (err: any) {
      console.error("Application error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erro ao enviar candidatura. Tente novamente."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    applyToJob,
    loading,
    error,
    success,
    setSuccess,
    setError
  };
}
