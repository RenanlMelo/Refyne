"use client";

import React, { useState } from "react";
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import styles from "./ApplyModal.module.scss";
import { useApplication } from "@/hooks/useApplication";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  jobId,
  jobTitle,
  companyName,
  onClose,
  onSuccess,
}) => {
  const { applyToJob, loading, error, success } = useApplication();
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyToJob({
        publicId: jobId,
        coverLetter,
        resume: resumeFile || undefined,
      });
    } catch (err) {
      // Error handled by hook
    }
  };

  if (success) {
    return (
      <div className={styles.modalOverlay}>
        <div className={`${styles.modalContent} ${styles.successModal}`}>
          <div className={styles.successIcon}>
            <CheckCircle size={64} />
          </div>
          <h2>Application Sent!</h2>
          <p>
            Your application for <strong>{jobTitle}</strong> at <strong>{companyName}</strong> was sent successfully.
          </p>
          <button 
            onClick={() => {
              if (onSuccess) onSuccess();
              onClose();
            }} 
            className={styles.closeBtn}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Apply Now</h2>
            <p>{jobTitle} · {companyName}</p>
          </div>
          <button onClick={onClose} className={styles.iconBtn}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {error && (
            <div className={styles.errorBanner}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="coverLetter">Cover Letter (Optional)</label>
            <textarea
              id="coverLetter"
              placeholder="Tell us why you are a good match for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              disabled={loading}
            />
            <span className={styles.hint}>Tip: Highlight your hands-on experience.</span>
          </div>

          <div className={styles.formGroup}>
            <label>Specific Resume (Optional)</label>
            <p className={styles.subHint}>If not provided, we will use the resume from your profile.</p>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className={styles.fileInput}
              />
              <label htmlFor="resume" className={styles.fileLabel}>
                {resumeFile ? (
                  <>
                    <FileText size={20} className={styles.fileIcon} />
                    <span className={styles.fileName}>{resumeFile.name}</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} className={styles.uploadIcon} />
                    <span>Click to upload (PDF, DOCX)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className={styles.spinner} />
                  Sending...
                </>
              ) : (
                "Confirm Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
