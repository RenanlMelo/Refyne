import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./FormHeader.module.scss";

interface ProfileHeaderProps {
  type?: "candidate" | "startup";
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ type = "candidate" }) => {
  const router = useRouter();
  
  return (
    <>
      <button type="button" onClick={() => router.push('/auth')} className={styles.backButton} title="Go back to authentication">
        <ArrowLeft className={styles.icon} />
      </button>

      <div className={styles.headerContent}>
        <span className={styles.badge}>
          {type === "candidate" ? "Candidate" : "Startup"}
        </span>
        <h1 className={styles.title}>
          Complete Your Profile
        </h1>
        <p className={styles.description}>
          Almost there! Fill in the final details to get started.
        </p>
      </div>
    </>
  );
};
