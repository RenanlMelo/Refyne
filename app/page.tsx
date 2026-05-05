import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Building, ShieldCheck, Target, Zap, LayoutDashboard, Filter, CheckCircle, Flame } from "lucide-react";
import styles from "./page.module.scss";
import ThemePicker from "./components/ThemePicker/ThemePicker";

export default function Home() {
  return (
    <div className={styles.pageContainer}>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <span>REFYNE</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#sobre">Overview</a>
            <a href="#pilares">Pillars</a>
            <a href="#funcionalidades">Platform</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemePicker />
            <Link href="/auth" className={styles.authButton}>
              Access Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            src="/hero_bg.png"
            alt="Refyne Abstract Background"
            fill
            priority
            className={styles.bgImage}
          />
        </div>

        {/* Ambient Lights */}
        <div className={styles.ambientLightTop} />
        <div className={styles.ambientLightBottom} />

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <div className={styles.heroBadge}>
              <Star />
              <span>INTELLIGENT MATCHMAKING</span>
            </div>
            <h1 className={styles.heroTitle}>
              Where culture <br className={`${styles.hidden} ${styles['md-block']}`} />
              meets <span className={styles.gradientText}>performance.</span>
            </h1>
            <p className={styles.heroDescription}>
              A platform that goes far beyond the technical resume. REFYNE ensures the alignment of intrinsic motivation and the &quot;hands-on&quot; profile demanded by the fastest-growing startups.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth" className={styles.primaryBtn}>
                Create an account
                <ArrowRight />
              </Link>
              <a href="#sobre" className={styles.secondaryBtn}>
                Discover how it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PROBLEMA X SOLUÇÃO */}
      <section id="sobre" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.gridTwoCol}>
            <div>
              <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div className={styles.badge}>The Recruiting Revolution</div>
              </div>
              <h2 className={styles.sectionHeader} style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>
                Traditional recruiting fails with startups.
              </h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Brilliant candidates from large corporations don&apos;t always adapt to the agile and chaotic culture of early-stage startups. Meanwhile, founders and startups waste precious time filtering resumes, instead of focusing on what matters: <strong style={{ color: 'white' }}>soft skills, adaptability, and a hands-on drive</strong>.
              </p>
            </div>

            <div className={styles.solutionBox}>
              <div className={styles.glow} />
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Target className={styles.icon} />
                </div>
                <h3 className={styles.title}>The Refyne Solution</h3>
              </div>
              <p className={styles.text}>
                We focus on aligning the startup&apos;s mission and culture with the professional&apos;s behavioral profile. We ensure long-term connections, lower turnover, and a team focused on growing a business from scratch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PILARES ESTRATÉGICOS */}
      <section id="pilares" className={`${styles.section} ${styles.darker}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Our Strategic Pillars</h2>
            <p className={styles.description}>
              The foundation of our methodology designed to connect the most promising opportunities with the most hungry talents in the market.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Flame />
              </div>
              <h3 className={styles.cardTitle}>Culture Match</h3>
              <p className={styles.cardText}>
                Our algorithm intrinsically evaluates if the candidate reflects the hands-on profile, vital for scaling and solving problems quickly.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.deepPurple}`}>
                <ShieldCheck />
              </div>
              <h3 className={styles.cardTitle}>Total Transparency</h3>
              <p className={styles.cardText}>
                Proposals are clear from the start, covering bold attraction models, working formats (on-site, hybrid), and Equity or Stock Options packages.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Zap />
              </div>
              <h3 className={styles.cardTitle}>Process Agility</h3>
              <p className={styles.cardText}>
                Cutting-edge environment created exclusively for founders—often the company&apos;s biggest recruiters—to make decisions in record time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FUNCIONALIDADES E MVP */}
      <section id="funcionalidades" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Platform Experience</h2>
            <p className={styles.description}>
              Features built with a focus on the direct experience between High-Growth Startups and Elite Talent.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Building className={`${styles.icon} ${styles.deepPurple}`} />
              <h3 className={styles.cardTitle}>Startup Profile</h3>
              <p className={styles.cardText}>
                The startup&apos;s official storefront. The definitive space to pitch and sell your business, purpose, and culture to candidates.
              </p>
            </div>

            <div className={styles.featureCard}>
              <Filter className={`${styles.icon} ${styles.purple}`} />
              <h3 className={styles.cardTitle}>Smart Filtering</h3>
              <p className={styles.cardText}>
                Surgical navigation through complex filters by startup stage (Seed, Series A, B, etc.) and the specific desired hiring model.
              </p>
            </div>

            <div className={styles.featureCard}>
              <LayoutDashboard className={`${styles.icon} ${styles.deepPurple}`} />
              <h3 className={styles.cardTitle}>Simple Dashboard</h3>
              <p className={styles.cardText}>
                Candidates count on a transparent environment to view their individual real-time status in each applicable recruitment process.
              </p>
            </div>

            <div className={`${styles.featureCard} ${styles.highlighted}`}>
              <CheckCircle className={`${styles.icon} ${styles.purple}`} />
              <h3 className={styles.cardTitle}>Refyne Curation</h3>
              <p className={styles.cardText}>
                Highlight the market&apos;s &quot;Top Picks&quot;, fully validated through exclusive competency Badge systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to redefine the talent market?</h2>
          <p className={styles.description}>
            Take the first step toward a journey connected by the right purposes.
          </p>
          <Link href="/auth" className={styles.ctaBtn}>
            Access Refyne Platform
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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
