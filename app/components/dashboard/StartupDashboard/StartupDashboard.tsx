"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useStartupJobs } from "../../../hooks/useStartupJobs";
import { PostJobModal } from "./PostJobModal";
import { Job } from "../../../hooks/useLatestJobs";
import { eraseCookie } from "../../../utils/cookies";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);
import {
  Briefcase,
  User,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Settings,
  LogOut,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Plus,
  Users,
} from "lucide-react";
import styles from "../../../home/home.module.scss";

type Tab = "postings" | "candidates" | "profile" | "notifications";

function StartupJobCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <div className={styles.companyInfo}>
          <div className={styles.logo} style={{ backgroundColor: job.logoBg, color: job.logoColor }}>
            {job.logo}
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.titleRow}>
              <h3>{job.title}</h3>
            </div>
            <p className={styles.companySubline}>
              {job.type}
              <span className={styles.dot}>·</span>
              <span className={styles.stage}>{job.hot ? "Open" : "Closed"}</span>
            </p>
          </div>
        </div>
        <div className={styles.matchAndSave}>
          <div className={styles.matchBadge} style={{ background: "rgba(204, 151, 255, 0.1)", color: "#CC97FF" }}>
            <Users className={styles.icon} />
            <span>0 Candidates</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginTop: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#d4d4d8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Clock size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Postado:</strong> {job.posted}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MapPin size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Local:</strong> {job.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Briefcase size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Modelo:</strong> {job.tags.join(', ')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <DollarSign size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Salário:</strong> {job.salary}</span>
        </div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className={styles.tags} style={{ gap: '0.35rem', alignItems: 'center', marginBottom: "0.5rem" }}>
          <span style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', marginRight: '0.25rem' }}>Skills:</span>
          {job.skills.map((skill) => (
            <span key={`skill-${skill}`} className={styles.tag} style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', background: "rgba(204, 151, 255, 0.1)", color: "#CC97FF", borderColor: "rgba(204, 151, 255, 0.2)" }}>
              {skill}
            </span>
          ))}
        </div>
      )}

      {expanded && (
        <div className={styles.expandedContent} style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          {job.equity && (
            <div style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "#CC97FF", fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>Equity</strong>
              <span style={{ fontSize: "0.9rem", color: "#fff" }}>{job.equity}</span>
            </div>
          )}
          <div style={{ marginBottom: "1.5rem" }} data-color-mode="dark">
            <h4 style={{ color: "#CC97FF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Descrição</h4>
            <MarkdownPreview source={job.description} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
          </div>
          {job.requirements && (
            <div data-color-mode="dark">
              <h4 style={{ color: "#CC97FF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Requisitos</h4>
              <MarkdownPreview source={job.requirements} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
            </div>
          )}
        </div>
      )}

      <div className={styles.actions} style={{ marginTop: "0.25rem", display: "flex", justifyContent: "flex-end" }}>
        <button 
          onClick={() => setExpanded(!expanded)}
          className={styles.moreBtn}
          style={{ background: "transparent", border: "none", color: "#CC97FF", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          {expanded ? "Menos" : "Ver detalhes"}
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}

export function StartupDashboard({ activeTab }: StartupDashboardProps) {
  const router = useRouter();
  const { actions } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { jobs, loading, error, refetch } = useStartupJobs();

  const handleLogout = () => {
    eraseCookie("token");
    router.push("/");
  };

type Tab = "postings" | "candidates" | "profile" | "notifications";

interface StartupDashboardProps {
  activeTab: string;
}

  const filteredJobs = jobs.filter(
    (j) => j.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.body} style={{ paddingTop: 0 }}>
      <main className={styles.main} style={{ marginLeft: 0 }}>
        <div className={styles.contentWrapper}>
          {activeTab === "postings" && (
            <>
              <div className={styles.sectionHeader}>
                <div>
                  <h1>My Postings</h1>
                  <p>{jobs.length} active job postings</p>
                </div>
                <button
                  className={styles.filterBtn}
                  style={{ background: "#CC97FF", color: "#000", border: "none" }}
                  onClick={() => setIsPostModalOpen(true)}
                >
                  <Plus className={styles.icon} /> Post New Job
                </button>
              </div>

              <div className={styles.jobList}>
                {loading ? (
                  <div className={styles.emptyState}>
                    <p>Loading your postings...</p>
                  </div>
                ) : error ? (
                  <div className={styles.emptyState}>
                    <p>{error}</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <StartupJobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <Briefcase className={styles.icon} />
                    <p>You haven't posted any jobs yet.</p>
                    <button
                      onClick={() => setIsPostModalOpen(true)}
                      style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#CC97FF", color: "#000", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "bold" }}
                    >
                      Post your first job
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab !== "postings" && (
            <div className={styles.emptyState}>
              <p>This module is currently in development.</p>
            </div>
          )}
        </div>
      </main>

      {isPostModalOpen && (
        <PostJobModal
          onClose={() => setIsPostModalOpen(false)}
          onSuccess={async () => {
            await refetch();
            setIsPostModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
