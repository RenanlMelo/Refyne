"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { CandidateDashboard } from "../components/dashboard/CandidateDashboard/CandidateDashboard";
import { StartupDashboard } from "../components/dashboard/StartupDashboard/StartupDashboard";
import { DashboardLayout } from "../components/layout/DashboardLayout/DashboardLayout";
import styles from "./home.module.scss";

export default function HomePage() {
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Pick up any tab requested via the sidebar navigation from non-home pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pending = sessionStorage.getItem("refyne-pending-tab");
      if (pending) {
        setActiveTab(pending);
        sessionStorage.removeItem("refyne-pending-tab");
      }
    }
  }, []);

  console.log("[home/page.tsx] Rendering. loading:", loading, "user:", user?.email);

  if (loading || !user) {
    console.log("[home/page.tsx] loading || !user is true, returning empty div");
    return (
      <div className={styles.homeContainer} style={{ background: "#050508", minHeight: "100vh" }} />
    );
  }

  const defaultTab = user.userType === "STARTUP" ? "postings" : "feed";
  const currentTab = activeTab ?? defaultTab;

  return (
    <DashboardLayout activeTab={currentTab} onTabChange={setActiveTab}>
      {user.userType === "STARTUP" ? (
        <StartupDashboard activeTab={currentTab} />
      ) : (
        <CandidateDashboard activeTab={currentTab} />
      )}
    </DashboardLayout>
  );
}
