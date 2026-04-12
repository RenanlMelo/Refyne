"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { PathwaySelector } from "../components/auth/PathwaySelector/PathwaySelector";
import { AuthForm } from "../components/auth/AuthForm/AuthForm";
import { SocialAuthButtons } from "../components/auth/SocialAuthButtons/SocialAuthButtons";
import styles from "./auth.module.scss";

export default function LoginPage() {
  const { state, actions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className={styles.authContainer}>
      {/* Background ambient light effects */}
      <div className={`${styles.ambientLight} ${styles.top}`} />
      <div className={`${styles.ambientLight} ${styles.bottom}`} />

      {!state.userType ? (
        <PathwaySelector
          onSelectType={(type) => {
            actions.setUserType(type);
            actions.setIsLogin(true);
          }}
          onSignIn={() => {
            actions.setUserType("candidato");
            actions.setIsLogin(true);
          }}
        />
      ) : (
        <AuthForm state={state} actions={actions}>
          <SocialAuthButtons
            onSocialLogin={actions.handleSocialLogin}
            disabled={state.socialLoading !== null}
          />
        </AuthForm>
      )}
    </div>
  );
}
