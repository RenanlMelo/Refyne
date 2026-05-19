"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, Building, ShieldCheck, Zap, LayoutDashboard, Filter, CheckCircle, Target, Rocket, Users, Award, TrendingUp } from "lucide-react";
import styles from "../page.module.scss";
import ThemePicker from "@/components/ThemePicker/ThemePicker";
import { setCookie } from "@/utils/cookies";
import ResearchForm from "@/components/ResearchForm/ResearchForm";

export default function StartupLanding() {
  useEffect(() => {
    setCookie("lastAccountType", "STARTUP", 30);
  }, []);

  return (
    <div className={styles.pageContainer}>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/startup" className={styles.logo}>
            <span>REFYNE</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#solucao">Solution</a>
            <a href="#vetted">Vetted Talent</a>
            <a href="#preview">Founder Pipeline</a>
            <Link href="/" className={styles.switchPathLink}>Not a founder?</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemePicker />
            <Link href="/auth" className={styles.authButton}>
              Startup Portal
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
              <span>FOR FOUNDERS & STARTUPS</span>
            </div>
            <h1 className={styles.heroTitle}>
              Find the talent <br className={`${styles.hidden} ${styles['md-block']}`} />
              that builds the <span className={styles.gradientText}>future.</span>
            </h1>
            <p className={styles.heroDescription}>
              Traditional recruiting fails with high-growth startups. REFYNE connects you with "hands-on" talent vetted for agility, culture, and performance.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth" className={styles.primaryBtn}>
                Scale your team
                <ArrowRight />
              </Link>
              <a href="#solucao" className={styles.secondaryBtn}>
                How we scale teams
              </a>
            </div>
          </div>


        </div>
      </section>



      {/* SECTION: STARTUP FOCUS */}
      <section id="solucao" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.gridTwoCol}>
            <div>
              <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div className={styles.badge}>The Hiring Revolution</div>
              </div>
              <h2 className={styles.sectionHeader} style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Build your A-Team in record time.
              </h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Stop wasting time on resumes that don&apos;t fit. We focus on <strong style={{ color: 'white' }}>soft skills, adaptability, and a hands-on drive</strong>. Connect with candidates who are ready to scale a business from scratch.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#d4d4d8' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Founder-led hiring flow
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Cultural alignment scoring
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Verified competency badges
                </li>
              </ul>
            </div>

            <div className={styles.solutionBox}>
              <div className={styles.glow} />
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Target className={styles.icon} />
                </div>
                <h3 className={styles.title}>The Refyne Advantage</h3>
              </div>
              <p className={styles.text}>
                Our curation ensures lower turnover and higher performance by aligning the candidate&apos;s mission with your startup&apos;s unique culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM PREVIEW */}
      <section id="preview" className={styles.section} style={{ backgroundColor: '#050505' }}>
        <div className={styles.container}>
          <div className={styles.gridTwoCol}>
            <div className={styles.previewImageWrapper}>
              <img 
                src="/startup_founder_pipeline_preview_1778247789641.png" 
                alt="Refyne Founder Pipeline" 
                className={styles.previewImage}
              />
              <div className={styles.imageGlow} />
            </div>
            <div>
              <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div className={styles.badge}>Founder Pipeline</div>
              </div>
              <h2 className={styles.sectionHeader} style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Hire at startup speed.
              </h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                A streamlined recruitment pipeline designed for founders. No clutter, just the data and candidates you need to make fast decisions.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#d4d4d8' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Automated talent curation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  Verified skill assessments
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className={styles.themeColor} />
                  One-click offer management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>




      {/* SECTION: STRATEGIC PILLARS */}
      <section id="metodologia" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Strategic Methodology</h2>
            <p className={styles.description}>
              Designed exclusively for founders who are their company's biggest recruiters.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Building className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>Employer Branding</h3>
              <p className={styles.cardText}>
                Pitch your business, culture, and purpose directly to top-tier talent in our exclusive ecosystem.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.deepPurple}`}>
                <ShieldCheck />
              </div>
              <h3 className={styles.cardTitle}>Vetted Curation</h3>
              <p className={styles.cardText}>
                Every candidate is validated through our competency badge system, ensuring they can handle the startup chaos.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Zap />
              </div>
              <h3 className={styles.cardTitle}>Hiring Agility</h3>
              <p className={styles.cardText}>
                An optimized workflow that allows founders to make decisions quickly and close positions in record time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FORM SECTION */}
      <section id="research" className={styles.researchSection}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.researchHeader}>
              <div className={styles.badge}>Founder Research</div>
              <h2>
                Help our team validate <span>REFYNE.</span>
              </h2>
              <p>
                We are validating the biggest hiring pain points with founders. Share your challenges to provide our team with the insights needed to build a better platform.
              </p>
            </div>
            <div className={styles.formCard}>
              <ResearchForm variant="startup" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to scale your team?</h2>
          <p className={styles.description}>
            Join REFYNE and start connecting with the elite talent your startup deserves.
          </p>
          <Link href="/auth" className={styles.ctaBtn}>
            Join as a Startup
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
