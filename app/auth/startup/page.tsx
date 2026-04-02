"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, GitBranch, Rocket, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function StartupAuthPage() {
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
        const response = await fetch("http://localhost:8000/users/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            passwordHash: password,
            userType: userType === "candidato" ? "CANDIDATE" : "STARTUP"
          }),
        });

        if (!response.ok) throw new Error("Erro ao criar usuário.");

        // Simular ida para a tela de Onboarding/home pós-cadastro
        router.push("/home");
      } else {
        // LOGIN
        const response = await fetch(`http://localhost:8000/users/${email}`);
        if (!response.ok) throw new Error("Usuário não encontrado.");

        const data = await response.json();
        // Verificação básica (MVP). Suportando plain text até ser implementado BCRYPT.
        if (data.passwordHash !== password) {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] overflow-x-hidden relative selection:bg-[#CC97FF]/30 font-sans">
      {/* Background ambient light effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#CC97FF]/5 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#9C48EA]/10 blur-[120px] mix-blend-screen pointer-events-none" />

      {!userType ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative animate-in fade-in duration-700 z-10">

          {/* Header area */}
          <div className="absolute top-0 w-full p-8 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
            <button onClick={() => router.push("/")} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-xl font-bold text-white tracking-wide">Refyne</div>
            <div className="w-16"></div> {/* Spacer for centering Refyne */}
          </div>

          {/* Main content */}
          <div className="text-center mb-12 max-w-2xl mt-16 sm:mt-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Choose your <span className="text-[#CC97FF]">pathway.</span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg">
              Whether you are building the future or looking to shape it,
              <br className="hidden sm:block" /> Refyne is where prestige meets performance.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
            {/* Candidate Card */}
            <button
              onClick={() => { setUserType("candidato"); setIsLogin(true); }}
              className="group relative flex flex-col p-8 sm:p-10 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-all text-left text-white h-[320px] sm:h-[360px] hover:bg-[#1a1a1a]"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-[#1c1c1c] flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#222]">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-[#CC97FF]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">I am a Candidate</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-auto flex-1">
                Join an exclusive network of high-tier developers and visionaries. Get matched with top-performing startups.
              </p>
              <div className="flex items-center gap-2 text-[#CC97FF] uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] mt-8">
                GET STARTED <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Startup Card */}
            <button
              onClick={() => { setUserType("startup"); setIsLogin(true); }}
              className="group relative flex flex-col p-8 sm:p-10 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-all text-left text-white h-[320px] sm:h-[360px] hover:bg-[#1a1a1a]"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-[#1c1c1c] flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#222]">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-[#CC97FF]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">I am a Startup</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-auto flex-1">
                Source elite talent specifically vetted for high-growth tech environments. Scale your engineering team.
              </p>
              <div className="flex items-center gap-2 text-[#CC97FF] uppercase text-[10px] sm:text-xs font-bold tracking-[0.2em] mt-8">
                POST A JOB <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Footer text */}
          <div className="mt-16 text-zinc-500 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => { setUserType("candidato"); setIsLogin(true); }}
              className="text-[#CC97FF] hover:text-white transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Faint side decors */}
          <div className="absolute bottom-8 left-8 text-zinc-800 text-[10px] tracking-[0.3em] leading-relaxed uppercase hidden lg:block">
            <div className="w-8 h-[1px] bg-zinc-800 mb-2"></div>
            SELECTION<br />.V2
          </div>
          <div className="absolute bottom-8 right-8 text-zinc-800 text-[10px] tracking-[0.3em] leading-relaxed uppercase hidden lg:block text-right">
            REFYNE PRESTIGE<br />HIRING REINVENTED
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-md mx-auto p-6 z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 relative overflow-hidden">

            {/* Subtle top shimmer effect */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#CC97FF]/50 to-transparent opacity-50" />

            <div>
              {/* Back Button */}
              <button
                onClick={() => setUserType(null)}
                className="absolute top-8 left-8 p-1.5 -ml-2 -mt-2 rounded-full bg-white/0 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
                title="Voltar para seleção de perfil"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8 mt-4">
                <span className="inline-block py-1 px-3 rounded-full bg-[#CC97FF]/10 text-[#CC97FF] text-xs font-medium mb-4 capitalize">
                  {userType === 'candidato' ? 'Candidate' : 'Startup'}
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                  {isLogin ? "Bem-vindo de volta" : "Criar uma conta"}
                </h1>
                <p className="text-zinc-400 text-sm">
                  {isLogin
                    ? "Entre com suas credenciais para continuar."
                    : "Preencha seus dados para começar a usar."}
                </p>
              </div>

              {/* Error Message */}
              {errorMSG && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center mb-4">
                  {errorMSG}
                </div>
              )}

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>

                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-zinc-300">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${emailError ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-[#CC97FF]'}`} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder={userType === 'startup' ? "email@suastartup.com" : "seu@email.com"}
                      className={`w-full pl-10 pr-4 py-2.5 bg-zinc-950/50 border rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all hover:bg-zinc-900/50 ${emailError
                        ? 'border-red-500/60 focus:ring-red-500/30 focus:border-red-500/60'
                        : 'border-white/5 focus:ring-[#CC97FF]/50 focus:border-[#CC97FF]/50'
                        }`}
                    />
                  </div>
                  {emailError && <p className="text-xs text-red-400 mt-1">{emailError}</p>}
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-300">Senha</label>
                    {isLogin && (
                      <a href="#" className="text-xs text-[#CC97FF] hover:text-[#9C48EA] transition-colors">
                        Esqueceu a senha?
                      </a>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${passwordError ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-[#CC97FF]'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-2.5 bg-zinc-950/50 border rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all hover:bg-zinc-900/50 ${passwordError
                        ? 'border-red-500/60 focus:ring-red-500/30 focus:border-red-500/60'
                        : 'border-white/5 focus:ring-[#CC97FF]/50 focus:border-[#CC97FF]/50'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-xs text-red-400 mt-1">{passwordError}</p>}
                </div>

                <div className={`space-y-5 overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? 'max-h-0 opacity-0' : 'max-h-[130px] opacity-100'}`}>
                  <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-zinc-300">Repita sua senha</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors ${confirmPasswordError ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-[#CC97FF]'}`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-4 py-2.5 bg-zinc-950/50 border rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 transition-all hover:bg-zinc-900/50 ${confirmPasswordError
                          ? 'border-red-500/60 focus:ring-red-500/30 focus:border-red-500/60'
                          : 'border-white/5 focus:ring-[#CC97FF]/50 focus:border-[#CC97FF]/50'
                          }`}
                      />
                    </div>
                    {confirmPasswordError && <p className="text-xs text-red-400 mt-1">{confirmPasswordError}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] text-white font-semibold py-3 px-4 transition-all hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(204,151,255,0.4)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#CC97FF]/50 mt-2"
                >
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    {loading ? (
                      <span className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        {isLogin ? "Entrar" : "Criar conta"}
                        <ArrowRight className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform text-white" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 mb-6 flex items-center">
                <div className="flex-1 border-t border-white/15"></div>
                <span className="px-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Ou</span>
                <div className="flex-1 border-t border-white/15"></div>
              </div>

              {/* Social Auth */}
              <div className="grid grid-cols-3 gap-3">
                {/* GitHub */}
                <button
                  id="btn-login-github"
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  disabled={socialLoading !== null}
                  title="Entrar com GitHub"
                  className="flex items-center justify-center gap-2 bg-zinc-950/30 border border-white/5 rounded-xl py-3 px-4 text-zinc-300 hover:bg-zinc-800/50 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "github" ? (
                    <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.79 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.01-2.05-3.33 0-4.02-1.33-4.02-1.33-.55-1.41-1.35-1.78-1.35-1.78-1.11-.76.08-.75.08-.75 1.23.09 1.88 1.27 1.88 1.27 1.1 1.91 2.88 1.36 3.58 1.04.11-.81.43-1.36.78-1.67-2.75-.31-5.64-1.37-5.64-6.1 0-1.35.49-2.46 1.29-3.33-.13-.31-.56-1.57.12-3.28 0 0 1.04-.33 3.4 1.26.99-.28 2.04-.42 3.1-.42 1.06 0 2.11.14 3.1.42 2.36-1.59 3.39-1.26 3.39-1.26.68 1.71.25 2.97.12 3.28.81.87 1.29 1.98 1.29 3.33 0 4.74-2.89 5.79-5.65 6.09.44.38.82.92.82 1.87 0 1.35-.01 2.44-.01 2.78 0 .32.22.69.83.58C20.56 21.79 24 17.31 24 12c0-6.63-5.37-12-12-12z" fill="currentColor" />
                    </svg>
                  )}
                </button>

                {/* Google */}
                <button
                  id="btn-login-google"
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading !== null}
                  title="Entrar com Google"
                  className="flex items-center justify-center gap-2 bg-zinc-950/30 border border-white/5 rounded-xl py-3 px-4 text-zinc-300 hover:bg-zinc-800/50 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "google" ? (
                    <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                </button>

                {/* LinkedIn */}
                <button
                  id="btn-login-linkedin"
                  type="button"
                  onClick={() => handleSocialLogin("linkedin")}
                  disabled={socialLoading !== null}
                  title="Entrar com LinkedIn"
                  className="flex items-center justify-center gap-2 bg-zinc-950/30 border border-white/5 rounded-xl py-3 px-4 text-zinc-300 hover:bg-zinc-800/50 transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "linkedin" ? (
                    <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Footer toggle */}
              <div className="mt-8 text-center text-sm text-zinc-400">
                {isLogin ? "Ainda não tem uma conta? " : "Já possui uma conta? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-white hover:text-[#CC97FF] transition-colors cursor-pointer"
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
