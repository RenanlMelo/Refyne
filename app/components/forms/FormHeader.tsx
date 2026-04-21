import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./FormHeader.module.scss";

interface ProfileHeaderProps {
  type?: "candidate" | "startup";
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ type = "candidate" }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/auth');
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("profileCompleted");
  }

  return (
    <>
      <button type="button" onClick={() => handleBack()} className={styles.backButton} title="Go back to authentication">
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
