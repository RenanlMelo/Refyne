"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm/AuthForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons/SocialAuthButtons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./auth.module.scss";

export default function LoginPage() {
  const { state, actions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isInitializing && !state.userType) {
      router.push("/");
    }
  }, [state.isInitializing, state.userType, router]);

  if (state.isInitializing || !state.userType) return null;


  return (
    <div className={styles.authContainer}>
      {/* Background ambient light effects */}
      <div className={`${styles.ambientLight} ${styles.top}`} />
      <div className={`${styles.ambientLight} ${styles.bottom}`} />

      <AuthForm state={state} actions={actions}>
        <SocialAuthButtons
          onSocialLogin={actions.handleSocialLogin}
          disabled={state.socialLoading !== null}
        />
      </AuthForm>
    </div>
  );
}
