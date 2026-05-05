"use client";

import { useParams, useRouter } from "next/navigation";
import { useJobDetails } from "../../hooks/useJobDetails";
import { DashboardLayout } from "../../components/layout/DashboardLayout/DashboardLayout";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  ChevronLeft,
  Globe,
  Building2,
  Users,
  Zap,
  Star,
  Layers,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import styles from "../jobs.module.scss";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { job, startup, loading, error } = useJobDetails(id);

  console.log("[jobs/[id]/page.tsx] Rendering. loading:", loading, "error:", error, "job:", job?.title);

  if (loading) {
    console.log("[jobs/[id]/page.tsx] Loading is true, rendering spinner");
    return (
      <DashboardLayout>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <p>Carregando vaga...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !job) {
    return (
      <DashboardLayout>
        <div className={styles.errorWrapper}>
          <h1>Ops! Algo deu errado.</h1>
          <p>{error || "Vaga não encontrada"}</p>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const formatSalary = (min: number, max: number) => {
    if (min === max) return `R$ ${(min / 1000).toFixed(0)}k`;
    return `R$ ${(min / 1000).toFixed(0)}k – ${(max / 1000).toFixed(0)}k`;
  };

  return (
    <DashboardLayout>
      <div className={styles.pageContainer}>

        {/* ── Back button ── */}
        <button onClick={() => router.back()} className={styles.backButton}>
          <ChevronLeft className={styles.backIcon} />
          Voltar para a busca
        </button>

        {/* ── Two-column layout ── */}
        <div className={styles.layout}>

          {/* ── LEFT: Main content ── */}
          <div className={styles.mainCol}>

            {/* Hero card */}
            <div className={styles.heroCard}>
              <div className={styles.companySection}>
                <div className={styles.companyLogo}>
                  {job.startupName.charAt(0).toUpperCase()}
                </div>
                <div className={styles.titleBlock}>
                  <h1>{job.title}</h1>
                  <p className={styles.companyName}>{job.startupName}</p>
                </div>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.applyBtn}>Candidatar-se agora</button>
                <button className={styles.saveBtn}>
                  <Bookmark size={18} />
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><MapPin /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Localização</span>
                  <span className={styles.statValue}>{job.city}, {job.state}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Briefcase /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Modelo</span>
                  <span className={styles.statValue}>{job.workModel}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><DollarSign /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Salário</span>
                  <span className={styles.statValue}>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><TrendingUp /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Equity</span>
                  <span className={styles.statValue}>{job.equityMin}% – {job.equityMax}%</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className={styles.section}>
              <h2>Sobre a posição</h2>
              <div className={styles.content}>{job.description}</div>
            </section>

            {/* Requirements */}
            {job.requirements && (
              <section className={styles.section}>
                <h2>Requisitos</h2>
                <div className={styles.content}>{job.requirements}</div>
              </section>
            )}

            {/* About startup */}
            {startup && (
              <section className={styles.section}>
                <h2>Sobre a {startup.companyName}</h2>
                <div className={styles.content}>{startup.description}</div>
              </section>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className={styles.sidebarCol}>

            {/* Skills */}
            <div className={styles.widget}>
              <h3>Habilidades Necessárias</h3>
              <div className={styles.skillTags}>
                {job.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Company info */}
            {startup && (
              <div className={styles.widget}>
                <h3>Informações da Empresa</h3>
                <div className={styles.companyInfoList}>
                  <div className={styles.companyInfoItem}>
                    <div className={styles.ciIcon}><Building2 /></div>
                    <div>
                      <div className={styles.ciLabel}>Setor</div>
                      <div className={styles.ciValue}>{startup.industry}</div>
                    </div>
                  </div>
                  <div className={styles.companyInfoItem}>
                    <div className={styles.ciIcon}><Layers /></div>
                    <div>
                      <div className={styles.ciLabel}>Fase</div>
                      <div className={styles.ciValue}>{startup.stage}</div>
                    </div>
                  </div>
                  <div className={styles.companyInfoItem}>
                    <div className={styles.ciIcon}><Users /></div>
                    <div>
                      <div className={styles.ciLabel}>Tamanho</div>
                      <div className={styles.ciValue}>{startup.size}</div>
                    </div>
                  </div>
                  {startup.websiteUrl && (
                    <a
                      href={startup.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyInfoItem}
                    >
                      <div className={styles.ciIcon}><Globe /></div>
                      <div>
                        <div className={styles.ciLabel}>Website</div>
                        <div className={styles.ciValue}>{startup.websiteUrl.replace(/^https?:\/\//, "")}</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Refyne tip */}
            <div className={`${styles.widget} ${styles.tipWidget}`}>
              <div className={styles.tipHeader}>
                <Zap className={styles.tipIcon} />
                <span>Dica Refyne</span>
              </div>
              <p>
                Esta startup está em fase de{" "}
                <strong>{startup?.stage}</strong> e valoriza muito
                profissionais com experiência em{" "}
                <strong>{job.skills[0]}</strong>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
