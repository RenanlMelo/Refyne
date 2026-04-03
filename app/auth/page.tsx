"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Rocket, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./auth.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"candidato" | "startup" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");
  const [socialLoading, setSocialLoading] = useState<"github" | "google" | "linkedin" | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  const handleSocialLogin = async (provider: "github" | "google" | "linkedin") => {
    setSocialLoading(provider);
    setErrorMSG("");
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      setErrorMSG(`Erro ao conectar com ${provider}. Tente novamente.`);
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMSG("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Insira um e-mail válido.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      if (!isLogin) {
        // CADASTRO
        const response = await fetch("http://localhost:8000/api/users/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            userType: userType === "candidato" ? "CANDIDATE" : "STARTUP"
          }),
        });

        if (!response.ok) throw new Error("Erro ao criar usuário.");

        // Segunda etapa de cadastro
        if (userType === "candidato") {
          router.push("/auth/candidate");
        } else {
          router.push("/auth/startup");
        }

      } else {
        // LOGIN
        const response = await fetch(`http://localhost:8000/users/${email}`);
        if (!response.ok) throw new Error("Usuário não encontrado.");

        const data = await response.json();
        if (data.password !== password) {
          throw new Error("Senha incorreta.");
        }
        router.push("/home");
      }
    } catch (err: any) {
      setErrorMSG(err.message || "Erro de conexão com servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Background ambient light effects */}
      <div className={`${styles.ambientLight} ${styles.top}`} />
      <div className={`${styles.ambientLight} ${styles.bottom}`} />

      {!userType ? (
        <div className={styles.selectionView}>
          {/* Header area */}
          <div className={styles.selectionHeader}>
            <button type="button" onClick={() => router.push("/")} className={styles.backBtn}>
              <ArrowLeft className={styles.iconSm} />
              <span className={`${styles.textSmall} ${styles.fontMedium}`}>Back</span>
            </button>
            <div className={styles.logo}>Refyne</div>
            <div style={{ width: '4rem' }}></div>
          </div>

          {/* Main content */}
          <div className={styles.selectionContent}>
            <h1>
              Choose your <span>pathway.</span>
            </h1>
            <p>
              Whether you are building the future or looking to shape it,
              <br className={`${styles.hidden} ${styles['sm-block']}`} /> Refyne is where prestige meets performance.
            </p>
          </div>

          {/* Cards Grid */}
          <div className={styles.selectionGrid}>
            {/* Candidate Card */}
            <button
              onClick={() => { setUserType("candidato"); setIsLogin(true); }}
              className={styles.selectionCard}
            >
              <div className={styles.iconWrapper}>
                <User className={styles.icon} />
              </div>
              <h3>I am a Candidate</h3>
              <p>
                Join an exclusive network of high-tier developers and visionaries. Get matched with top-performing startups.
              </p>
              <div className={styles.ctaLabel}>
                GET STARTED <ArrowRight className={styles.iconSm} />
              </div>
            </button>

            {/* Startup Card */}
            <button
              onClick={() => { setUserType("startup"); setIsLogin(true); }}
              className={styles.selectionCard}
            >
              <div className={styles.iconWrapper}>
                <Rocket className={styles.icon} />
              </div>
              <h3>I am a Startup</h3>
              <p>
                Source elite talent specifically vetted for high-growth tech environments. Scale your engineering team.
              </p>
              <div className={styles.ctaLabel}>
                POST A JOB <ArrowRight className={styles.iconSm} />
              </div>
            </button>
          </div>

          {/* Footer text */}
          <div className={styles.selectionFooter}>
            Already have an account?{" "}
            <button
              onClick={() => { setUserType("candidato"); setIsLogin(true); }}
              className={styles.linkBtn}
            >
              Sign In
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.formView}>
          <div className={styles.formCard}>
            {/* Subtle top shimmer effect */}
            <div className={styles.cardShimmer} />

            <div>
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setUserType(null)}
                className={styles.backBtn}
                style={{ position: 'absolute', top: '2rem', left: '2.5rem' }}
                title="Voltar para seleção de perfil"
              >
                <ArrowLeft className={styles.iconMd} color="white" />
              </button>

              {/* Header */}
              <div className={styles.formHeader}>
                <span className={styles.badge}>
                  {userType === 'candidato' ? 'Candidate' : 'Startup'}
                </span>
                <h1>
                  {isLogin ? "Bem-vindo de volta" : "Criar uma conta"}
                </h1>
                <p>
                  {isLogin
                    ? "Entre com suas credenciais para continuar."
                    : "Preencha seus dados para começar a usar."}
                </p>
              </div>

              {/* Error Message */}
              {errorMSG && (
                <div className={styles.errorAlert}>
                  {errorMSG}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={`${styles.icon} ${emailError ? styles.error : ''}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder={userType === 'startup' ? "email@suastartup.com" : "seu@email.com"}
                      className={emailError ? styles.error : ''}
                    />
                  </div>
                  {emailError && <p className={styles.inputErrorText}>{emailError}</p>}
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.passwordHeader}>
                    <label>Senha</label>
                    {isLogin && (
                      <a href="#" className={styles.forgotLink}>
                        Esqueceu a senha?
                      </a>
                    )}
                  </div>
                  <div className={styles.inputWrapper}>
                    <Lock className={`${styles.icon} ${passwordError ? styles.error : ''}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                      placeholder="••••••••"
                      className={passwordError ? styles.error : ''}
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

                {!isLogin && (
                  <div className={styles.formGroup}>
                    <label>Repita sua senha</label>
                    <div className={styles.inputWrapper}>
                      <Lock className={`${styles.icon} ${confirmPasswordError ? styles.error : ''}`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                        placeholder="••••••••"
                        className={confirmPasswordError ? styles.error : ''}
                      />
                    </div>
                    {confirmPasswordError && <p className={styles.inputErrorText}>{confirmPasswordError}</p>}
                  </div>
                )}

                <button type="submit" className={styles.submitBtn}>
                  {loading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {isLogin ? "Entrar" : "Criar conta"}
                      <ArrowRight className={styles.iconSm} />
                    </span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.text}>Ou</span>
                <div className={styles.line}></div>
              </div>

              {/* Social Auth */}
              <div className={styles.socialGrid}>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  disabled={socialLoading !== null}
                  className={styles.socialBtn}
                >
                  <svg className={styles.iconMd} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.79 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.01-2.05-3.33 0-4.02-1.33-4.02-1.33-.55-1.41-1.35-1.78-1.35-1.78-1.11-.76.08-.75.08-.75 1.23.09 1.88 1.27 1.88 1.27 1.1 1.91 2.88 1.36 3.58 1.04.11-.81.43-1.36.78-1.67-2.75-.31-5.64-1.37-5.64-6.1 0-1.35.49-2.46 1.29-3.33-.13-.31-.56-1.57.12-3.28 0 0 1.04-.33 3.4 1.26.99-.28 2.04-.42 3.1-.42 1.06 0 2.11.14 3.1.42 2.36-1.59 3.39-1.26 3.39-1.26.68 1.71.25 2.97.12 3.28.81.87 1.29 1.98 1.29 3.33 0 4.74-2.89 5.79-5.65 6.09.44.38.82.92.82 1.87 0 1.35-.01 2.44-.01 2.78 0 .32.22.69.83.58C20.56 21.79 24 17.31 24 12c0-6.63-5.37-12-12-12z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading !== null}
                  className={styles.socialBtn}
                >
                  <svg className={styles.iconMd} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("linkedin")}
                  disabled={socialLoading !== null}
                  className={styles.socialBtn}
                >
                  <svg className={styles.iconMd} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>

              {/* Footer toggle */}
              <div className={styles.formFooter}>
                {isLogin ? "Ainda não tem uma conta? " : "Já possui uma conta? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className={styles.toggleBtn}
                >
                  {isLogin ? "Cadastre-se" : "Faça login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
