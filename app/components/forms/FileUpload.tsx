import React, { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";
import styles from "./FileUpload.module.scss";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileSelect,
  selectedFile,
  error,
  required,
  accept = ".pdf",
  maxSizeMB = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelect(file);
    }
  };

  const validateAndSelect = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      alert(`File too large. Maximum allowed: ${maxSizeMB}MB`);
      return;
    }
    onFileSelect(file);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.fileUploadWrapper}>
      <label className={styles.uploadLabel}>
        {label}
        {required && <span className={styles.requiredAsterisk}>*</span>}
      </label>

      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ""} ${selectedFile ? styles.hasFile : ""} ${error ? styles.errorZone : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className={styles.hiddenInput}
        />

        {!selectedFile ? (
          <div className={styles.emptyState}>
            <div className={styles.iconCircle}>
              <Upload className={styles.uploadIcon} />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.primaryText}>Click or drag your resume</p>
              <p className={styles.secondaryText}>PDF (Max {maxSizeMB}MB)</p>
            </div>
          </div>
        ) : (
          <div className={styles.fileState}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIconCircle}>
                <FileText className={styles.fileIcon} />
              </div>
              <div className={styles.fileDetails}>
                <p className={styles.fileName}>{selectedFile.name}</p>
                <p className={styles.fileSize}>
                  {(selectedFile.size / 1024).toFixed(1)} KB • <span className={styles.successText}>Ready for submission</span>
                </p>
              </div>
            </div>
            <button className={styles.removeButton} onClick={removeFile} type="button">
              <X size={18} />
            </button>
            <CheckCircle2 className={styles.checkIcon} />
          </div>
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
