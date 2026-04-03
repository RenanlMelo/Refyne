import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Building, ShieldCheck, Target, Zap, LayoutDashboard, Filter, CheckCircle, Flame } from "lucide-react";
import styles from "./page.module.scss";

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
            <a href="#sobre">Visão Geral</a>
            <a href="#pilares">Pilares</a>
            <a href="#funcionalidades">Plataforma</a>
          </div>
          <Link href="/auth" className={styles.authButton}>
            Acessar Plataforma
          </Link>
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
              <span>MATCHMAKING INTELIGENTE</span>
            </div>
            <h1 className={styles.heroTitle}>
              Onde a cultura <br className={`${styles.hidden} ${styles['md-block']}`} />
              encontra a <span className={styles.gradientText}>performance.</span>
            </h1>
            <p className={styles.heroDescription}>
              Uma plataforma que vai muito além do currículo técnico. A REFYNE garante o alinhamento de brilho nos olhos e o perfil "hands-on" exigido pelas startups que mais crescem.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth" className={styles.primaryBtn}>
                Criar uma conta
                <ArrowRight />
              </Link>
              <a href="#sobre" className={styles.secondaryBtn}>
                Descobrir como funciona
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
                <div className={styles.badge}>A Revolução do Recrutamento</div>
              </div>
              <h2 className={styles.sectionHeader} style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>
                O recrutamento tradicional falha com startups.
              </h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Candidatos brilhantes de grandes corporações nem sempre se adaptam à cultura ágil e caótica do early stage. Enquanto isso, fundadores e startups perdem tempo precioso filtrando currículos, em vez de focar no que importa: <strong style={{ color: 'white' }}>soft skills, adaptabilidade e brilho nos olhos</strong>.
              </p>
            </div>

            <div className={styles.solutionBox}>
              <div className={styles.glow} />
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Target className={styles.icon} />
                </div>
                <h3 className={styles.title}>A Solução Refyne</h3>
              </div>
              <p className={styles.text}>
                Focamos em alinhar a missão e cultura da startup com o perfil comportamental do profissional. Garantimos conexões de longo prazo, menor turnover e um time focado em crescer um negócio do zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PILARES ESTRATÉGICOS */}
      <section id="pilares" className={`${styles.section} ${styles.darker}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Nossos Pilares Estratégicos</h2>
            <p className={styles.description}>
              A base da nossa metodologia desenhada para conectar as oportunidades mais promissoras aos talentos mais vorazes do mercado.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Flame />
              </div>
              <h3 className={styles.cardTitle}>Match de Cultura</h3>
              <p className={styles.cardText}>
                Nosso algoritmo avalia intrinsecamente se o candidato reflete o perfil "mão na massa" (hands-on), vital para escalar e resolver problemas rápidos.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.deepPurple}`}>
                <ShieldCheck />
              </div>
              <h3 className={styles.cardTitle}>Transparência Total</h3>
              <p className={styles.cardText}>
                As propostas são claras desde o início, cobrindo modelos de atração arrojados, formato de trabalho presencial, híbrido, pacote de Equity ou Stock Options.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.iconWrapper} ${styles.purple}`}>
                <Zap />
              </div>
              <h3 className={styles.cardTitle}>Agilidade no Processo</h3>
              <p className={styles.cardText}>
                Ambiente de ponta pensado exclusivamente para que os fundadores – frequentemente os maiores recrutadores da empresa – tomem decisões em tempo recorde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FUNCIONALIDADES E MVP */}
      <section id="funcionalidades" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Experiência da Plataforma</h2>
            <p className={styles.description}>
              Funcionalidades construídas no foco da experiência direta entre Startups de Alto Crescimento e Talentos de Elite.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Building className={`${styles.icon} ${styles.deepPurple}`} />
              <h3 className={styles.cardTitle}>Perfil da Startup</h3>
              <p className={styles.cardText}>
                A vitrine oficial da startup. O espaço definitivo de "pitch" para vender seu negócio, seu propósito e sua cultura aos candidatos.
              </p>
            </div>

            <div className={styles.featureCard}>
              <Filter className={`${styles.icon} ${styles.purple}`} />
              <h3 className={styles.cardTitle}>Smart Filtering</h3>
              <p className={styles.cardText}>
                Navegação cirúrgica através de filtros complexos por estágio da startup (Seed, Series A, B, etc.) e o modelo específico de contratação desejado.
              </p>
            </div>

            <div className={styles.featureCard}>
              <LayoutDashboard className={`${styles.icon} ${styles.deepPurple}`} />
              <h3 className={styles.cardTitle}>Dashboard Simples</h3>
              <p className={styles.cardText}>
                O candidato conta com um ambiente transparente para visualização em tempo real de seu status individual em cada processo seletivo aplicável.
              </p>
            </div>

            <div className={`${styles.featureCard} ${styles.highlighted}`}>
              <CheckCircle className={`${styles.icon} ${styles.purple}`} />
              <h3 className={styles.cardTitle}>Curadoria Refyne</h3>
              <p className={styles.cardText}>
                Destaque com os melhores "Top Picks" do mercado, com validações suportadas através de sistemas exclusivos de Badges de competência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>Pronto para redefinir o mercado de talentos?</h2>
          <p className={styles.description}>
            Dê o primeiro passo para uma jornada conectada pelos propósitos certos.
          </p>
          <Link href="/auth" className={styles.ctaBtn}>
            Acessar Plataforma Refyne
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.logo}>REFYNE</div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Refyne Inc. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
