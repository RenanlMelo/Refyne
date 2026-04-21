"use client";

import { useEffect, useState } from "react";
import { CandidateDashboard } from "../components/dashboard/CandidateDashboard/CandidateDashboard";
import { StartupDashboard } from "../components/dashboard/StartupDashboard/StartupDashboard";
import styles from "./home.module.scss";

export default function HomePage() {
  const [userType, setUserType] = useState<"CANDIDATE" | "STARTUP" | null>(null);

  useEffect(() => {
    const type = localStorage.getItem("userType") as "CANDIDATE" | "STARTUP";
    setUserType(type);
  }, []);

  if (!userType) {
    return (
      <div className={styles.homeContainer} style={{ background: "#050508", minHeight: "100vh" }}>
      </div>
    );
  }

  return userType === "STARTUP" ? <StartupDashboard /> : <CandidateDashboard />;
}
