"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCandidateProfile } from "../../hooks/useCandidateProfile";
import { ProfileHeader } from "../../components/forms/FormHeader";
import { ProfileForm } from "../../components/forms/CandidateForm";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./candidate.module.scss";

export default function CandidateProfilePage() {
  const router = useRouter();
  const { state, actions } = useCandidateProfile();
  const { user, loading } = useAuthContext();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log("[auth/candidate/page.tsx] useEffect triggered. loading:", loading, "user:", user?.email);
    if (loading) return;

    if (!user || user.userType !== "CANDIDATE") {
      console.log("[auth/candidate/page.tsx] user not found or not CANDIDATE. redirecting to /auth");
      router.push("/auth");
    } else {
      console.log("[auth/candidate/page.tsx] user authorized. Setting isAuthorized = true");
      setIsAuthorized(true);
    }
  }, [router, user, loading]);

  console.log("[auth/candidate/page.tsx] Rendering. isAuthorized:", isAuthorized, "loading:", loading);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className={styles.profilePageWrapper}>
      {/* Background ambient light effects */}
      <div className={styles.ambientLightTop} />
      <div className={styles.ambientLightBottom} />

      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          {/* Subtle top shimmer effect */}
          <div className={styles.cardShimmer} />

          {/* Header (Badge, Title, Description) */}
          <ProfileHeader />

          {/* Error Message Alert */}
          {state.errorMSG && (
            <div className={styles.errorAlert}>
              {state.errorMSG}
            </div>
          )}

          {/* Form Content (Fields and Submit) */}
          <ProfileForm state={state} actions={actions} />
        </div>
      </div>
    </div>
  );
}
