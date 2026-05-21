/**
 * Central API configuration.
 *
 * Set NEXT_PUBLIC_API_URL in your environment to point to the backend:
 *   - Local:      http://localhost:8000
 *   - Production: https://refyne-server.onrender.com
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

