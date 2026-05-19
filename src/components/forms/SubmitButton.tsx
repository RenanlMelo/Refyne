import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={styles.submitButton}
    >
      <span className={styles.buttonContent}>
        {loading ? (
          <span className={styles.spinner}></span>
        ) : (
          <div className={styles.buttonContent}>
            {text}
            <ArrowRight className={styles.icon} />
          </div>
        )}
      </span>
    </button>
  );
};
