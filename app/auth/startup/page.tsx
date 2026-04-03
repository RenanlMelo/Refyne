"use client";

import React from "react";
import { useStartupProfile } from "../../hooks/useStartupProfile";
import { ProfileHeader } from "../../components/forms/FormHeader";
import { StartupForm } from "../../components/forms/StartupForm";
import styles from "./startup.module.scss";

export default function StartupProfilePage() {
  const { state, actions } = useStartupProfile();

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
