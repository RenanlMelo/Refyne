import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookies";

export interface JobSuggestionDTO {
  id: number;
  publicId: string;
  title: string;
  companyName?: string;
  startupName?: string;
  location?: string;
  [key: string]: any;
}

interface UseSearchSuggestionsProps {
  q: string;
  workModel?: string;
  equityMin?: number;
  equityMax?: number;
  debounceMs?: number;
}

export function useSearchSuggestions({
  q,
  workModel,
  equityMin,
  equityMax,
  debounceMs = 300,
}: UseSearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<JobSuggestionDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q || q.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = getCookie("token");
        const params = new URLSearchParams();
        params.append("q", q);
        if (workModel) params.append("workModel", workModel);
        if (equityMin !== undefined) params.append("equityMin", equityMin.toString());
        if (equityMax !== undefined) params.append("equityMax", equityMax.toString());

        const response = await axios.get(
          `http://localhost:8000/api/jobs/search/suggestions?${params.toString()}`,
          {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        setSuggestions(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [q, workModel, equityMin, equityMax, debounceMs]);

  return { suggestions, loading, error };
}
