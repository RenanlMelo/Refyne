"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Building, ShieldCheck, Zap, LayoutDashboard, Filter, CheckCircle, Flame, Rocket, Users, Briefcase } from "lucide-react";
import styles from "../page.module.scss";
import ThemePicker from "@/components/ThemePicker/ThemePicker";
import { setCookie } from "@/utils/cookies";
import ResearchForm from "@/components/ResearchForm/ResearchForm";

export default function CandidateLanding() {
  useEffect(() => {
    setCookie("lastAccountType", "CANDIDATE", 30);
  }, []);

  return (
    <div className={styles.pageContainer}>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/candidate" className={styles.logo}>
            <span>REFYNE</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#beneficios">Benefits</a>
            <a href="#vagas">Featured Startups</a>
            <a href="#preview">Platform</a>
            <Link href="/" className={styles.switchPathLink}>Not a candidate?</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemePicker />
            <Link href="/auth" className={styles.authButton}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.ambientLightTop} />
        <div className={styles.ambientLightBottom} />

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <div className={styles.heroBadge}>
              <Star />
              <span>FOR ELITE TALENT</span>
            </div>
            <h1 className={styles.heroTitle}>
              Scale your career <br className={`${styles.hidden} ${styles['md-block']}`} />
              in the best <span className={styles.gradientText}>startups.</span>
            </h1>
            <p className={styles.heroDescription}>
              Join an exclusive network of high-tier professionals. We connect you with high-growth companies that value your culture and performance.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth" className={styles.primaryBtn}>
                Join as a Candidate
                <ArrowRight />
              </Link>
              <a href="#beneficios" className={styles.secondaryBtn}>
                Explore opportunities
              </a>
            </div>
          </div>


        </div>
      </section>



      {/* SECTION: PILLARS */}
      <section id="beneficios" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.badge}>Your Career, Refined</div>
            <h2 className={styles.title}>Beyond the Technical Resume</h2>
            <p className={styles.description}>
              We understand that high-performance candidates look for more than just a job. They look for purpose, equity, and a culture that fosters growth.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Flame />
              </div>
              <h3 className={styles.cardTitle}>Cultural Alignment</h3>
              <p className={styles.cardText}>
                We match you with startups where your "hands-on" drive and values actually fit the team's DNA.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.deepPurple}`}>
                <ShieldCheck />
              </div>
              <h3 className={styles.cardTitle}>Premium Packages</h3>
              <p className={styles.cardText}>
                Access roles with clear compensation, including Equity and Stock Options from the start.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Zap />
              </div>
              <h3 className={styles.cardTitle}>Direct Access</h3>
              <p className={styles.cardText}>
                Skip the long queues. Get in direct contact with founders and decision-makers in record time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM PREVIEW */}
      <section id="preview" className={styles.section} style={{ backgroundColor: '#050505' }}>
        <div className={styles.container}>
          <div className={styles.gridTwoCol}>
            <div>
              <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div className={styles.badge}>Next-Gen Dashboard</div>
              </div>
              <h2 className={styles.sectionHeader} style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Your career command center.
              </h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Manage your applications, track your match scores, and discover companies that fit your values in a dashboard designed for the elite professional.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#d4d4d8' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Match score visualization
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Real-time status updates
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Direct founder messaging
                </li>
              </ul>
            </div>
            <div className={styles.previewImageWrapper}>
              <img 
                src="/candidate_dashboard_preview_1778247708982.png" 
                alt="Refyne Candidate Dashboard" 
                className={styles.previewImage}
              />
              <div className={styles.imageGlow} />
            </div>
          </div>
        </div>
      </section>




      {/* RESEARCH FORM SECTION */}
      <section id="research" className={styles.researchSection}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.researchHeader}>
              <div className={styles.badge}>User Research</div>
              <h2>
                Help our team validate <span>REFYNE.</span>
              </h2>
              <p>
                We are currently validating our platform with top-tier professionals. Share your insights to help our team understand the biggest challenges in the current market.
              </p>
            </div>
            <div className={styles.formCard}>
              <ResearchForm variant="candidate" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to find your next challenge?</h2>
          <p className={styles.description}>
            Join REFYNE and connect with the most promising startups in the market.
          </p>
          <Link href="/auth" className={styles.ctaBtn}>
            Join as a Candidate
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.logo}>REFYNE</div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Refyne Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
