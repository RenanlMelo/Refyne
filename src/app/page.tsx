"use client";

import Link from "next/link";
import { User, Rocket, ArrowRight } from "lucide-react";
import styles from "./selection.module.scss";
import { setCookie } from "@/utils/cookies";
import ThemePicker from "@/components/ThemePicker/ThemePicker";

export default function PathSelection() {
  const handleSelect = (type: "CANDIDATE" | "STARTUP") => {
    setCookie("lastAccountType", type, 30);
  };

  return (
    <div className={styles.selectionPage}>
      
      {/* Background/Logo area */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>REFYNE</div>
      </div>

      {/* Theme Picker — fixed top-right */}
      <div className={styles.themePickerCorner}>
        <ThemePicker />
      </div>

      <main className={styles.content}>
        <header className={styles.header}>
          <h1>
            Choose your <span className={styles.gradientText}>pathway.</span>
          </h1>
          <p>
            Whether you are building the future or looking to shape it, Refyne is where culture meets performance.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Candidate Pathway */}
          <Link 
            href="/candidate" 
            className={styles.pathCard}
            onClick={() => handleSelect("CANDIDATE")}
          >
            <div className={styles.iconWrapper}>
              <User />
            </div>
            <div className={styles.cardBody}>
              <h2>I am a Candidate</h2>
              <p>
                Join an exclusive network of high-tier professionals. Get matched with top-performing startups based on culture and drive.
              </p>
            </div>
            <div className={styles.cardFooter}>
              Explore Opportunities <ArrowRight className={styles.arrow} size={18} />
            </div>
          </Link>

          {/* Startup Pathway */}
          <Link 
            href="/startup" 
            className={styles.pathCard}
            onClick={() => handleSelect("STARTUP")}
          >
            <div className={styles.iconWrapper}>
              <Rocket />
            </div>
            <div className={styles.cardBody}>
              <h2>I am a Startup</h2>
              <p>
                Source elite talent specifically vetted for high-growth environments. Scale your engineering and product teams with ease.
              </p>
            </div>
            <div className={styles.cardFooter}>
              Scale Your Team <ArrowRight className={styles.arrow} size={18} />
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Already have an account? 
          <Link href="/auth">
            <button>Sign In</button>
          </Link>
        </p>
      </footer>
    </div>
  );
}
