import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '@/utils/cookies';
import { API_BASE_URL } from '@/utils/api';

export interface CandidateApplication {
  applicationId: string;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedAt: string;
  jobPublicId: string; // Added to enable navigation to job details
}

export function useMyApplications() {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = getCookie('token');
      const response = await axios.get(`${API_BASE_URL}/api/applications/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Applications response data:", response.data);

      const mappedApplications = response.data.map((app: any) => ({
        applicationId: app.applicationId,
        jobTitle: app.jobTitle,
        companyName: app.companyName,
        status: app.status,
        appliedAt: app.appliedAt,
        jobPublicId: app.jobPublicId
      }));

      setApplications(mappedApplications);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, error, refetch: fetchApplications };
}
