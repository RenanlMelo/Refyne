import React from "react";
import { User, Rocket, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./PathwaySelector.module.scss";

interface PathwaySelectorProps {
  onSelectType: (type: "candidato" | "startup") => void;
  onSignIn: () => void;
}

export const PathwaySelector: React.FC<PathwaySelectorProps> = ({
  onSelectType,
  onSignIn,
}) => {
  const router = useRouter();

  return (
    <div className={styles.selectionView}>
      {/* Header area */}
      <div className={styles.selectionHeader}>
        <button
          type="button"
          onClick={() => router.push("/")}
          className={styles.backBtn}
        >
          <ArrowLeft className={styles.iconSm} />
          <span className={styles.backLabel}>Back</span>
        </button>
        <div className={styles.logo}>Refyne</div>
        <div style={{ width: "4rem" }}></div>
      </div>

      {/* Main content */}
      <div className={styles.selectionContent}>
        <h1>
          Choose your <span>pathway.</span>
        </h1>
        <p>
          Whether you are building the future or looking to shape it,
          <br className={styles.brResponsive} /> Refyne is where prestige meets
          performance.
        </p>
      </div>

      {/* Cards Grid */}
      <div className={styles.selectionGrid}>
        {/* Candidate Card */}
        <button
          onClick={() => onSelectType("candidato")}
          className={styles.selectionCard}
        >
          <div className={styles.iconWrapper}>
            <User className={styles.cardIcon} />
          </div>
          <h3>I am a Candidate</h3>
          <p>
            Join an exclusive network of high-tier developers and visionaries.
            Get matched with top-performing startups.
          </p>
          <div className={styles.ctaLabel}>
            GET STARTED <ArrowRight className={styles.ctaArrow} />
          </div>
        </button>

        {/* Startup Card */}
        <button
          onClick={() => onSelectType("startup")}
          className={styles.selectionCard}
        >
          <div className={styles.iconWrapper}>
            <Rocket className={styles.cardIcon} />
          </div>
          <h3>I am a Startup</h3>
          <p>
            Source elite talent specifically vetted for high-growth tech
            environments. Scale your engineering team.
          </p>
          <div className={styles.ctaLabel}>
            POST A JOB <ArrowRight className={styles.ctaArrow} />
          </div>
        </button>
      </div>

      {/* Footer text */}
      <div className={styles.selectionFooter}>
        Already have an account?{" "}
        <button onClick={onSignIn} className={styles.linkBtn}>
          Sign In
        </button>
      </div>
    </div>
  );
};
