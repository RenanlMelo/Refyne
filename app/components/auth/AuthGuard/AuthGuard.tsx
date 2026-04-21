"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./AuthGuard.module.scss";

// Routes that don't require any authentication
const PUBLIC_ROUTES = ["/", "/auth", "/forgot-password", "/reset-password"];

// Routes that only require a token (no profile completion check)
const TOKEN_ONLY_ROUTES = ["/auth/candidate", "/auth/startup"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Reset on route change
    if (prevPathname.current !== pathname) {
      setIsReady(false);
      prevPathname.current = pathname;
    }

    // Public routes — no checks needed
    if (PUBLIC_ROUTES.includes(pathname)) {
      setIsReady(true);
      return;
    }

    const token = localStorage.getItem("token");

    // No token at all → go to login
    if (!token) {
      router.push("/auth");
      return;
    }

    // Token-only routes (profile registration pages) → just need a token
    if (TOKEN_ONLY_ROUTES.includes(pathname)) {
      setIsReady(true);
      return;
    }

    // All other routes → require token + completed profile
    const profileCompleted = localStorage.getItem("profileCompleted");
    if (profileCompleted !== "true") {
      const userType = localStorage.getItem("userType");
      if (userType === "CANDIDATE") {
        router.push("/auth/candidate");
      } else if (userType === "STARTUP") {
        router.push("/auth/startup");
      } else {
        router.push("/auth");
      }
      return;
    }

    // All checks passed
    setIsReady(true);
  }, [pathname, router]);

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
