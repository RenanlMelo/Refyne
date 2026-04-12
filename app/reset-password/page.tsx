"use client";

import React, { useState, Suspense } from "react";
import { Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "../styles/password-flow.module.scss";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (value: string) => value.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccess(false);

    let valid = true;

    if (!token) {
      setErrorMSG("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password. The link may have expired.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (err: any) {
      setErrorMSG(err.message || "Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.formCard}>
        <div className={styles.cardShimmer} />
        <div className={styles.header}>
          <h1>Password Reset!</h1>
          <p>Your password has been successfully updated.</p>
        </div>
        <div className={styles.successAlert}>
          Redirecting to login...
        </div>
        <Link href="/auth" className={styles.backLink}>
          <ArrowLeft className={styles.iconSm} /> Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.cardShimmer} />
      
      <div className={styles.header}>
        <h1>Set new password</h1>
        <p>Please enter your new password below.</p>
      </div>

      {errorMSG && <div className={styles.errorAlert}>{errorMSG}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* New Password */}
        <div className={styles.formGroup}>
          <label>New Password</label>
          <div className={styles.inputWrapper}>
            <Lock className={`${styles.inputIcon} ${passwordError ? styles.error : ""}`} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="••••••••"
              className={passwordError ? styles.error : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeBtn}
            >
              {showPassword ? <EyeOff className={styles.iconSm} /> : <Eye className={styles.iconSm} />}
            </button>
          </div>
          {passwordError && <p className={styles.inputErrorText}>{passwordError}</p>}
        </div>

        {/* Confirm Password */}
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <div className={styles.inputWrapper}>
            <Lock className={`${styles.inputIcon} ${confirmPasswordError ? styles.error : ""}`} />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              placeholder="••••••••"
              className={confirmPasswordError ? styles.error : ""}
            />
          </div>
          {confirmPasswordError && (
            <p className={styles.inputErrorText}>{confirmPasswordError}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <span className={styles.spinner}></span>
          ) : (
            <span className={styles.submitLabel}>
              Reset Password
              <ArrowRight className={styles.iconSm} />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={`${styles.ambientLight} ${styles.top}`} />
      <div className={`${styles.ambientLight} ${styles.bottom}`} />
      <Suspense fallback={<div className={styles.formCard}><span className={styles.spinner}></span></div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
