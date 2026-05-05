"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStartupProfile } from "../../hooks/useStartupProfile";
import { ProfileHeader } from "../../components/forms/FormHeader";
import { StartupForm } from "../../components/forms/StartupForm";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./startup.module.scss";

export default function StartupProfilePage() {
  const router = useRouter();
  const { state, actions } = useStartupProfile();
  const { user, loading } = useAuthContext();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user || user.userType !== "STARTUP") {
      router.push("/auth");
    } else {
      setIsAuthorized(true);
    }
  }, [router, user, loading]);

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
          <ProfileHeader type="startup" />

          {/* Error Message Alert */}
          {state.errorMSG && (
            <div className={styles.errorAlert}>
              {state.errorMSG}
            </div>
          )}

          {/* Form Content (Fields and Submit) */}
          <StartupForm state={state} actions={actions} />
        </div>
      </div>
    </div>
  );
}
