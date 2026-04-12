"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../styles/password-flow.module.scss";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setEmailError("");
    setSuccess(false);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link. Please try again.");
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMSG(err.message || "Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.ambientLight} ${styles.top}`} />
      <div className={`${styles.ambientLight} ${styles.bottom}`} />

      <div className={styles.formCard}>
        <div className={styles.cardShimmer} />

        <div className={styles.header}>
          <h1>Forgot Password</h1>
          <p>Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {errorMSG && <div className={styles.errorAlert}>{errorMSG}</div>}

        {success ? (
          <div>
            <div className={styles.successAlert}>
              Reset link sent! Please check your inbox.
            </div>
            <Link href="/auth" className={styles.backLink}>
              <ArrowLeft className={styles.iconSm} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={`${styles.inputIcon} ${emailError ? styles.error : ""}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="your@email.com"
                  className={emailError ? styles.error : ""}
                />
              </div>
              {emailError && <p className={styles.inputErrorText}>{emailError}</p>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.spinner}></span>
              ) : (
                <span className={styles.submitLabel}>
                  Send reset link
                  <ArrowRight className={styles.iconSm} />
                </span>
              )}
            </button>

            <Link href="/auth" className={styles.backLink}>
              <ArrowLeft className={styles.iconSm} /> Back to Sign In
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
