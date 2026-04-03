"use client";

import React from "react";
import { useCandidateProfile } from "../../hooks/useCandidateProfile";
import { ProfileHeader } from "../../components/forms/FormHeader";
import { ProfileForm } from "../../components/forms/CandidateForm";
import styles from "./candidate.module.scss";

export default function CandidateProfilePage() {
  const { state, actions } = useCandidateProfile();

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
