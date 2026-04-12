import React from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import styles from "./AuthForm.module.scss";

interface AuthFormState {
  isLogin: boolean;
  userType: "candidato" | "startup" | null;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  loading: boolean;
  errorMSG: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

interface AuthFormActions {
  setIsLogin: (v: boolean) => void;
  setUserType: (v: "candidato" | "startup" | null) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  toggleShowPassword: () => void;
  setEmailError: (v: string) => void;
  setPasswordError: (v: string) => void;
  setConfirmPasswordError: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface AuthFormProps {
  state: AuthFormState;
  actions: AuthFormActions;
  children?: React.ReactNode; // Slot for SocialAuthButtons
}

export const AuthForm: React.FC<AuthFormProps> = ({
  state,
  actions,
  children,
}) => {
  return (
    <div className={styles.formView}>
      <div className={styles.formCard}>
        {/* Subtle top shimmer effect */}
        <div className={styles.cardShimmer} />

        <div>
          {/* Back Button */}
          <button
            type="button"
            onClick={() => actions.setUserType(null)}
            className={styles.backBtn}
            title="Back to profile selection"
          >
            <ArrowLeft className={styles.iconLg} color="white" />
          </button>

          {/* Header */}
          <div className={styles.formHeader}>
            <span className={styles.badge}>
              {state.userType === "candidato" ? "Candidate" : "Startup"}
            </span>
            <h1>
              {state.isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p>
              {state.isLogin
                ? "Enter your credentials to continue."
                : "Fill in your details to get started."}
            </p>
          </div>

          {/* Error Message */}
          {state.errorMSG && (
            <div className={styles.errorAlert}>{state.errorMSG}</div>
          )}

          {/* Form */}
          <form onSubmit={actions.handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail
                  className={`${styles.inputIcon} ${state.emailError ? styles.error : ""}`}
                />
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) => {
                    actions.setEmail(e.target.value);
                    actions.setEmailError("");
                  }}
                  placeholder={
                    state.userType === "startup"
                      ? "email@yourstartup.com"
                      : "your@email.com"
                  }
                  className={state.emailError ? styles.error : ""}
                />
              </div>
              {state.emailError && (
                <p className={styles.inputErrorText}>{state.emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <label>Password</label>
                {state.isLogin && (
                  <Link href="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <Lock
                  className={`${styles.inputIcon} ${state.passwordError ? styles.error : ""}`}
                />
                <input
                  type={state.showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) => {
                    actions.setPassword(e.target.value);
                    actions.setPasswordError("");
                  }}
                  placeholder="••••••••"
                  className={state.passwordError ? styles.error : ""}
                />
                <button
                  type="button"
                  onClick={actions.toggleShowPassword}
                  className={styles.eyeBtn}
                >
                  {state.showPassword ? (
                    <EyeOff className={styles.iconSm} />
                  ) : (
                    <Eye className={styles.iconSm} />
                  )}
                </button>
              </div>
              {state.passwordError && (
                <p className={styles.inputErrorText}>{state.passwordError}</p>
              )}
            </div>

            {/* Confirm Password (signup only) */}
            {!state.isLogin && (
              <div className={styles.formGroup}>
                <label>Confirm password</label>
                <div className={styles.inputWrapper}>
                  <Lock
                    className={`${styles.inputIcon} ${state.confirmPasswordError ? styles.error : ""}`}
                  />
                  <input
                    type={state.showPassword ? "text" : "password"}
                    value={state.confirmPassword}
                    onChange={(e) => {
                      actions.setConfirmPassword(e.target.value);
                      actions.setConfirmPasswordError("");
                    }}
                    placeholder="••••••••"
                    className={state.confirmPasswordError ? styles.error : ""}
                  />
                </div>
                {state.confirmPasswordError && (
                  <p className={styles.inputErrorText}>
                    {state.confirmPasswordError}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className={styles.submitBtn}>
              {state.loading ? (
                <span className={styles.spinner}></span>
              ) : (
                <span className={styles.submitLabel}>
                  {state.isLogin ? "Sign In" : "Create account"}
                  <ArrowRight className={styles.iconSm} />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <span className={styles.dividerText}>Or</span>
            <div className={styles.line}></div>
          </div>

          {/* Social Auth (children slot) */}
          {children}

          {/* Footer toggle */}
          <div className={styles.formFooter}>
            {state.isLogin
              ? "Don't have an account yet? "
              : "Already have an account? "}
            <button
              onClick={() => actions.setIsLogin(!state.isLogin)}
              className={styles.toggleBtn}
            >
              {state.isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
