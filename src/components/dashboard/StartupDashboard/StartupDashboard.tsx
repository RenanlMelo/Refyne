"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useStartupJobs } from "@/hooks/useStartupJobs";
import { PostJobModal } from "./PostJobModal";
import { Job } from "@/hooks/useLatestJobs";
import { eraseCookie } from "@/utils/cookies";
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
  Mail,
  FileText,
  Calendar,
} from "lucide-react";
import styles from "../../../app/home/home.module.scss";
import { useStartupApplications, StartupApplication } from "@/hooks/useStartupApplications";

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
          <div className={styles.matchBadge} style={{ background: "rgba(var(--primary-light-rgb), 0.1)", color: "var(--primary-light)" }}>
            <Users className={styles.icon} />
            <span>{job.candidateCount || 0} Candidates</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', marginTop: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#d4d4d8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Clock size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Posted:</strong> {job.posted}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MapPin size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Location:</strong> {job.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Briefcase size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Model:</strong> {job.tags.join(', ')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <DollarSign size={14} style={{ color: '#a1a1aa', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><strong>Salary:</strong> {job.salary}</span>
        </div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className={styles.tags} style={{ gap: '0.35rem', alignItems: 'center', marginBottom: "0.5rem" }}>
          <span style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', marginRight: '0.25rem' }}>Skills:</span>
          {job.skills.map((skill) => (
            <span key={`skill-${skill}`} className={styles.tag} style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', background: "rgba(var(--primary-light-rgb), 0.1)", color: "var(--primary-light)", borderColor: "rgba(var(--primary-light-rgb), 0.2)" }}>
              {skill}
            </span>
          ))}
        </div>
      )}

      {expanded && (
        <div className={styles.expandedContent} style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          {job.equity && (
            <div style={{ marginBottom: "1.5rem" }}>
              <strong style={{ color: "var(--primary-light)", fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>Equity</strong>
              <span style={{ fontSize: "0.9rem", color: "#fff" }}>{job.equity}</span>
            </div>
          )}
          <div style={{ marginBottom: "1.5rem" }} data-color-mode="dark">
            <h4 style={{ color: "var(--primary-light)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Description</h4>
            <MarkdownPreview source={job.description} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
          </div>
          {job.requirements && (
            <div data-color-mode="dark">
              <h4 style={{ color: "var(--primary-light)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Requirements</h4>
              <MarkdownPreview source={job.requirements} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
            </div>
          )}
        </div>
      )}

      <div className={styles.actions} style={{ marginTop: "0.25rem", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={styles.moreBtn}
          style={{ background: "transparent", border: "none", color: "var(--primary-light)", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          {expanded ? "Less" : "View details"}
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}

function CandidateCard({ app }: { app: StartupApplication }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.appCard}>
      <div className={styles.row}>
        <div
          className={styles.logo}
          style={{ backgroundColor: "rgba(var(--primary-light-rgb), 0.1)", color: "var(--primary-light)" }}
        >
          {app.candidateName.charAt(0)}
        </div>
        <div className={styles.info}>
          <p className={styles.role}>{app.candidateName}</p>
          <p className={styles.company}>{app.jobTitle}</p>
          <div className={styles.metaRow} style={{ display: "flex", gap: "1rem", marginTop: "0.25rem", color: "#a1a1aa", fontSize: "0.8rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Mail size={12} /> {app.candidateEmail}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Calendar size={12} /> {new Date(app.appliedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={styles.statusCol}>
          <span className={`${styles.statusBadge} ${app.status.toLowerCase() === 'approved' ? styles.approved : app.status.toLowerCase() === 'closed' ? styles.closed : styles.pending}`}>
            {app.status}
          </span>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            {app.resumeUrl ? (
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                title="Download Resume"
                style={{ background: "var(--primary-light)", color: "#000", border: "none" }}
              >
                <FileText size={16} />
              </a>
            ) : (
              <span className={styles.iconBtn} title="No resume provided" style={{ opacity: 0.3, cursor: "not-allowed" }}>
                <FileText size={16} />
              </span>
            )}
            <button
              className={styles.iconBtn}
              onClick={() => setExpanded(!expanded)}
              title={expanded ? "Hide Details" : "Show Details"}
              style={expanded ? { background: "rgba(255,255,255,0.1)" } : {}}
            >
              {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h4 style={{ color: "var(--primary-light)", fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Cover Letter</h4>
            <p style={{ fontSize: "0.9rem", color: "#d4d4d8", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {app.coverLetter || "No cover letter provided."}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => window.location.href = `/jobs/${app.jobPublicId}`}
              style={{ background: "transparent", border: "1px solid rgba(var(--primary-light-rgb), 0.3)", color: "var(--primary-light)", padding: "0.4rem 0.8rem", borderRadius: "0.4rem", fontSize: "0.8rem", cursor: "pointer" }}
            >
              View original posting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CandidatesView({
  applications,
  loading,
  error
}: {
  applications: StartupApplication[],
  loading: boolean,
  error: string | null
}) {

  if (loading) {
    return (
      <div className={styles.applicationsView}>
        <div className={styles.header}>
          <h1>Candidates</h1>
        </div>
        <div className={styles.emptyState}>
          <p>Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.applicationsView}>
        <div className={styles.header}>
          <h1>Candidates</h1>
        </div>
        <div className={styles.emptyState}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.applicationsView}>
      <div className={styles.header}>
        <h1>Candidates</h1>
        <p>{applications.length} applications received</p>
      </div>
      {applications.length > 0 ? (
        <div className={styles.candidateGrid}>
          {applications.map((app) => (
            <CandidateCard key={app.applicationId} app={app} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Users className={styles.icon} />
          <p>No candidates have applied yet.</p>
        </div>
      )}
    </div>
  );
}

interface StartupDashboardProps {
  activeTab: string;
}

export function StartupDashboard({ activeTab }: StartupDashboardProps) {
  const router = useRouter();
  const { actions } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { applications, loading: appsLoading, error: appsError } = useStartupApplications();
  const { jobs, loading, error, refetch } = useStartupJobs();

  const handleLogout = () => {
    eraseCookie("token");
    router.push("/");
  };

  type Tab = "postings" | "candidates" | "profile" | "notifications";


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
                  style={{ background: "var(--primary-light)", color: "#000", border: "none" }}
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
                      style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "var(--primary-light)", color: "#000", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "bold" }}
                    >
                      Post your first job
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "candidates" && (
            <CandidatesView
              applications={applications}
              loading={appsLoading}
              error={appsError}
            />
          )}

          {activeTab !== "postings" && activeTab !== "candidates" && (
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
