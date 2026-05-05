import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookies";

export type Skill = {
  id: number;
  nomeExibicao: string;
};

export function useSkillSearch(searchTerm: string) {
  const [results, setResults] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cache = useRef<{ [key: string]: Skill[] }>({});

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (term.length < 2) {
      setResults([]);
      return;
    }

    if (cache.current[term]) {
      setResults(cache.current[term]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get<Skill[]>(
          "http://localhost:8000/api/skills/search",
          {
            params: { input: term },
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            }
          }
        );

        const data = response.data.slice(0, 10);
        cache.current[term] = data;
        setResults(data);
      } catch (err) {
        setError("Failed to search skills");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return { results, loading, error };
}