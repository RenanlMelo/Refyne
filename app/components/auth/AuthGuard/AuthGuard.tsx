"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../../../context/AuthContext";
import { getCookie } from "../../../utils/cookies";
import styles from "./AuthGuard.module.scss";

// Routes that don't require any authentication
const PUBLIC_ROUTES = ["/", "/auth", "/forgot-password", "/reset-password"];

// Routes that only require a token (no profile completion check)
const TOKEN_ONLY_ROUTES = ["/auth/candidate", "/auth/startup"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("[AuthGuard.tsx] useEffect triggered. pathname:", pathname, "loading:", loading, "user:", user?.email);
    // Public routes — always accessible, no check needed
    if (PUBLIC_ROUTES.includes(pathname)) {
      console.log("[AuthGuard.tsx] Public route detected. Setting isReady = true");
      setIsReady(true);
      return;
    }

    // While AuthContext is still resolving, wait
    if (loading) {
      console.log("[AuthGuard.tsx] AuthContext is loading. Setting isReady = false");
      setIsReady(false);
      return;
    }

    const token = getCookie("token");

    // No token → redirect to login
    if (!token) {
      router.push("/auth");
      return;
    }

    // Token present but user null means /me failed
    if (!user) {
      router.push("/auth");
      return;
    }

    // Token-only routes (profile registration pages)
    if (TOKEN_ONLY_ROUTES.includes(pathname)) {
      setIsReady(true);
      return;
    }

    // Profile not yet completed → send to registration
    if (user.profileCompleted === false) {
      console.log("[AuthGuard.tsx] Profile not completed. Redirecting to registration.");
      if (user.userType === "CANDIDATE") {
        router.push("/auth/candidate");
      } else if (user.userType === "STARTUP") {
        router.push("/auth/startup");
      } else {
        router.push("/auth");
      }
      return;
    }

    // All checks passed
    console.log("[AuthGuard.tsx] All checks passed. Setting isReady = true");
    setIsReady(true);
  }, [pathname, router, user, loading]);

  console.log("[AuthGuard.tsx] Rendering. isReady:", isReady);

  if (!isReady) {
    const logoLetters = "REFYNE".split("");
    return (
      <div className={styles.loadingScreen}>
        {/* Floating ambient particles */}
        <div className={styles.particles}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.particle} />
          ))}
        </div>

        {/* Horizontal light streak */}
        <div className={styles.lightStreak} />

        <div className={styles.loadingContent}>
          {/* Central orb with orbit rings */}
          <div className={styles.orbContainer}>
            <div className={styles.orbCore} />
            <div className={`${styles.orbitRing} ${styles.ring1}`} />
            <div className={`${styles.orbitRing} ${styles.ring2}`} />
            <div className={`${styles.orbitRing} ${styles.ring3}`} />
            <div className={styles.arcSweep} />
          </div>

          {/* Letter-by-letter logo reveal */}
          <div className={styles.loadingLogo}>
            {logoLetters.map((letter, i) => (
              <span key={i} className={styles.logoLetter}>
                {letter}
              </span>
            ))}
          </div>

          <p className={styles.loadingText}>Initializing</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
