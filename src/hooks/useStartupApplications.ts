"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { API_BASE_URL } from "@/utils/api";

export interface StartupApplication {
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  appliedAt: string;
  status: string;
  resumeUrl?: string;
  coverLetter?: string;
  jobTitle?: string;
  jobPublicId?: string;
}

export function useStartupApplications(jobPublicId?: string) {
  const [applications, setApplications] = useState<StartupApplication[]>([]);
  const [loading, setLoading] = useState(false); // don't load initially unless we have an id
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!jobPublicId) return; // Don't fetch if no job selected
    
    setLoading(true);
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_BASE_URL}/api/applications/job/${jobPublicId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Startup applications response data:", response.data);

      const mappedApplications = response.data.map((app: any) => ({
        applicationId: app.applicationId,
        candidateName: app.fullName,
        candidateEmail: app.email,
        appliedAt: app.appliedAt,
        status: app.status,
        resumeUrl: app.resumeUrl,
        coverLetter: app.coverLetter,
        jobTitle: "", // Not provided by JobApplicationDetailDTO
        jobPublicId: jobPublicId 
      }));

      setApplications(mappedApplications);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching startup applications:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [jobPublicId]);

  useEffect(() => {
    if (jobPublicId) {
      fetchApplications();
    }
  }, [fetchApplications, jobPublicId]);

  return { applications, loading, error, refetch: fetchApplications };
}
