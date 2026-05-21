"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLatestJobs, Job } from "@/hooks/useLatestJobs";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useAuthContext } from "@/context/AuthContext";
import {
  Briefcase,
  Bookmark,
  User,
  Bell,
  Search,
  MapPin,
  Clock,
  Building2,
  ChevronRight,
  ChevronLeft,
  Star,
  Zap,
  Filter,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  Settings,
  LogOut,
  Flame,
  Globe,
  DollarSign,
  ArrowUpRight,
  X,
  CircleCheck,
  AlertCircle,
  Layers,
} from "lucide-react";

import styles from "../../../app/home/home.module.scss";
import { ApplyModal } from "../../modals/ApplyModal/ApplyModal";
import {
  useMyApplications,
  CandidateApplication,
} from "@/hooks/useMyApplications";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Alex Ferreira",
  role: "Senior Full Stack Developer",
  avatar: null,
  initials: "AF",
  location: "São Paulo, SP",
  matchScore: 94,
  appliedCount: 3,
  savedCount: 7,
  profileViews: 128,
};

const MOCK_APPLICATIONS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Nimbus AI",
    logo: "N",
    logoColor: "var(--primary-light)",
    logoBg: "#1a1030",
    status: "Under review",
    statusVariant: "pending",
    statusIcon: AlertCircle,
    date: "29 Mar 2026",
    stage: "Technical interview",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Orbit Systems",
    logo: "O",
    logoColor: "#60a5fa",
    logoBg: "#0d1628",
    status: "Approved",
    statusVariant: "approved",
    statusIcon: CircleCheck,
    date: "25 Mar 2026",
    stage: "Offer sent",
  },
  {
    id: 3,
    title: "React Native Engineer",
    company: "MobiStack",
    logo: "M",
    logoColor: "#f59e0b",
    logoBg: "#1a1408",
    status: "Closed",
    statusVariant: "closed",
    statusIcon: X,
    date: "18 Mar 2026",
    stage: "Did not advance",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nimbus AI viewed your profile",
    desc: "The recruiter accessed your profile 30 minutes ago.",
    time: "30min",
    read: false,
    icon: User,
    iconColor: "text-[var(--primary-light)]",
    iconBg: "bg-[var(--primary-light)]/10",
  },
  {
    id: 2,
    title: "New job with 97% match!",
    desc: "Senior Frontend Engineer at Nimbus AI.",
    time: "2h",
    read: false,
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/10",
  },
  {
    id: 3,
    title: "Application update",
    desc: "Orbit Systems moved you to the next stage.",
    time: "1d",
    read: true,
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
  },
  {
    id: 4,
    title: "Your profile is incomplete",
    desc: "Add your experience to increase your match score.",
    time: "2d",
    read: true,
    icon: AlertCircle,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "feed" | "saved" | "applications" | "profile" | "notifications";

interface CandidateDashboardProps {
  activeTab: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({
  job,
  onSaveToggle,
  onApply,
  isApplied = false,
}: {
  job: Job;
  onSaveToggle: (id: number) => void;
  onApply: (job: Job) => void;
  isApplied?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.jobCard}
      onClick={() => (window.location.href = `/jobs/${job.publicId}`)}
      style={{ cursor: "pointer" }}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.companyInfo}>
          {/* Company logo */}
          <div
            className={styles.logo}
            style={{ backgroundColor: job.logoBg, color: job.logoColor }}
          >
            {job.logo}
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.titleRow}>
              <h3>{job.title}</h3>
              {job.hot && (
                <span className={styles.hotBadge}>
                  <Flame className={styles.icon} /> Hot
                </span>
              )}
            </div>
            <p className={styles.companySubline}>
              {job.company}
              <span className={styles.dot}>·</span>
              <span className={styles.stage}>{job.stage}</span>
            </p>
          </div>
        </div>

        {/* Match + Save */}
        <div className={styles.matchAndSave}>
          <div className={styles.matchBadge}>
            <Star className={styles.icon} />
            <span>{job.match}% match</span>
          </div>
          <button
            onClick={() => onSaveToggle(job.id)}
            className={`${styles.saveBtn} ${job.saved ? styles.saved : ""}`}
          >
            <Bookmark className={styles.icon} />
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem 1rem",
          marginTop: "0.75rem",
          marginBottom: "0.75rem",
          fontSize: "0.8rem",
          color: "#d4d4d8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Clock size={14} style={{ color: "#a1a1aa", flexShrink: 0 }} />
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>Posted:</strong> {job.posted}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <MapPin size={14} style={{ color: "#a1a1aa", flexShrink: 0 }} />
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>Location:</strong> {job.location}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Briefcase size={14} style={{ color: "#a1a1aa", flexShrink: 0 }} />
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>Model:</strong> {job.tags.join(", ")}
          </span>
        </div>
      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div
          className={styles.tags}
          style={{
            gap: "0.35rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: "bold",
              marginRight: "0.25rem",
            }}
          >
            Skills:
          </span>
          {job.skills.map((skill) => (
            <span
              key={`skill-${skill}`}
              className={styles.tag}
              style={{
                padding: "0.15rem 0.5rem",
                fontSize: "0.7rem",
                background: "rgba(var(--primary-light-rgb), 0.1)",
                color: "var(--primary-light)",
                borderColor: "rgba(var(--primary-light-rgb), 0.2)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Description toggle */}
      {expanded && (
        <div
          className={styles.expandedContent}
          style={{
            marginTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.5rem",
          }}
        >
          {job.equity && (
            <div style={{ marginBottom: "1.5rem" }}>
              <strong
                style={{
                  color: "var(--primary-light)",
                  fontSize: "0.9rem",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                Equity
              </strong>
              <span style={{ fontSize: "0.9rem", color: "#fff" }}>
                {job.equity}
              </span>
            </div>
          )}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                color: "var(--primary-light)",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              Description
            </h4>
            <p className={styles.description} style={{ marginTop: 0 }}>
              {job.description}
            </p>
          </div>
          {job.requirements && (
            <div>
              <h4
                style={{
                  color: "var(--primary-light)",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Requirements
              </h4>
              <p className={styles.description} style={{ marginTop: 0 }}>
                {job.requirements}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div
        className={styles.actions}
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          marginTop: "0.25rem",
        }}
      >
        <button
          className={styles.applyBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (!isApplied) onApply(job);
          }}
          disabled={isApplied}
          style={
            isApplied
              ? {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  background: "rgba(255,255,255,0.1)",
                  color: "#a1a1aa",
                }
              : {}
          }
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
        <button className={styles.externalBtn}>
          <ArrowUpRight className={styles.icon} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/jobs/${job.publicId}`;
          }}
          className={styles.moreBtn}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: "var(--primary-light)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          View details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ProfileView() {
  return (
    <div className={styles.profileView}>
      {/* Profile header card */}
      <div className={styles.headerCard}>
        {/* Banner */}
        <div className={styles.banner} />
        <div className={styles.mainInfo}>
          {/* Avatar */}
          <div className={styles.avatarRow}>
            <div className={styles.avatar}>{MOCK_USER.initials}</div>
            <button className={styles.editBtn}>Edit profile</button>
          </div>
          <h2>{MOCK_USER.name}</h2>
          <p className={styles.role}>{MOCK_USER.role}</p>
          <p className={styles.location}>
            <MapPin className={styles.icon} /> {MOCK_USER.location}
          </p>
          <div className={styles.statsGrid}>
            <div className={`${styles.statBox} ${styles.primary}`}>
              <div className={styles.val}>{MOCK_USER.matchScore}%</div>
              <div className={styles.label}>Match Score</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.val}>{MOCK_USER.profileViews}</div>
              <div className={styles.label}>Views</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.val}>{MOCK_USER.appliedCount}</div>
              <div className={styles.label}>Applications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={styles.skillsCard}>
        <h3>Skills</h3>
        <div className={styles.skillsGrid}>
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Docker",
            "Go",
            "GraphQL",
            "AWS",
          ].map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className={styles.experienceCard}>
        <h3>Experience</h3>
        <div className={styles.experienceList}>
          {[
            {
              role: "Senior Full Stack Developer",
              company: "Deco.cx",
              period: "Jan 2024 – Present",
              desc: "Technical leadership of the platform squad. Stack: React, Deno, TypeScript.",
            },
            {
              role: "Frontend Engineer",
              company: "Nuvemshop",
              period: "Jun 2022 – Dec 2023",
              desc: "Development of Design System components and admin panel features.",
            },
          ].map((exp, i) => (
            <div key={i} className={styles.expItem}>
              <div className={styles.expLogo}>
                <Building2 className={styles.icon} />
              </div>
              <div className={styles.expInfo}>
                <p className={styles.jobTitle}>{exp.role}</p>
                <p className={styles.company}>{exp.company}</p>
                <p className={styles.period}>{exp.period}</p>
                <p className={styles.desc}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationsView({
  applications,
  loading,
  error,
}: {
  applications: CandidateApplication[];
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return (
      <div className={styles.applicationsView}>
        <div className={styles.header}>
          <h1>My Applications</h1>
        </div>
        <div className={styles.emptyState}>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.applicationsView}>
        <div className={styles.header}>
          <h1>My Applications</h1>
        </div>
        <div className={styles.emptyState}>
          <AlertCircle className={styles.icon} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.applicationsView}>
      <div className={styles.header}>
        <h1>My Applications</h1>
        <p>{applications.length} total</p>
      </div>
      {applications.length > 0 ? (
        applications.map((app) => {
          // Map status to UI variants
          let statusVariant: "pending" | "approved" | "closed" = "pending";
          let StatusIcon = AlertCircle;

          const statusLower = app.status?.toLowerCase() || "";
          if (
            statusLower.includes("approved") ||
            statusLower.includes("hired") ||
            statusLower.includes("accepted")
          ) {
            statusVariant = "approved";
            StatusIcon = CircleCheck;
          } else if (
            statusLower.includes("rejected") ||
            statusLower.includes("closed") ||
            statusLower.includes("declined")
          ) {
            statusVariant = "closed";
            StatusIcon = X;
          }

          return (
            <div
              key={app.applicationId}
              className={styles.appCard}
              onClick={() =>
                (window.location.href = `/jobs/${app.jobPublicId}`)
              }
              style={{ cursor: "pointer" }}
            >
              <div className={styles.row}>
                <div
                  className={styles.logo}
                  style={{
                    backgroundColor: "rgba(var(--primary-light-rgb), 0.1)",
                    color: "var(--primary-light)",
                  }}
                >
                  {app.companyName?.charAt(0) || "C"}
                </div>
                <div className={styles.info}>
                  <p className={styles.role}>{app.jobTitle}</p>
                  <p className={styles.company}>{app.companyName}</p>
                  <p className={styles.stage}>
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.statusCol}>
                  <span
                    className={`${styles.statusBadge} ${styles[statusVariant]}`}
                  >
                    <StatusIcon className={styles.icon} />
                    {app.status}
                  </span>
                  <p className={styles.date}>
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.emptyState}>
          <Layers className={styles.icon} />
          <p>You haven't applied to any jobs yet.</p>
        </div>
      )}
    </div>
  );
}

function NotificationsView() {
  return (
    <div className={styles.notificationsView}>
      <div className={styles.header}>
        <h1>Notifications</h1>
        <button className={styles.markAll}>Mark all as read</button>
      </div>
      {MOCK_NOTIFICATIONS.map((notif) => {
        const Icon = notif.icon;
        // Simple mapping for icon container styling
        const iconContainerStyle = {
          backgroundColor:
            notif.iconBg.includes("CC97FF") ||
            notif.iconBg.includes("primary-light")
              ? "rgba(var(--primary-light-rgb), 0.1)"
              : notif.iconBg.includes("yellow")
                ? "rgba(234, 179, 8, 0.1)"
                : notif.iconBg.includes("emerald")
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(251, 146, 60, 0.1)",
        };
        const iconStyle = {
          color:
            notif.iconColor.includes("CC97FF") ||
            notif.iconColor.includes("primary-light")
              ? "var(--primary-light)"
              : notif.iconColor.includes("yellow")
                ? "#eab308"
                : notif.iconColor.includes("emerald")
                  ? "#10b981"
                  : "#fb923c",
        };

        return (
          <div
            key={notif.id}
            className={`${styles.notifCard} ${notif.read ? styles.read : styles.unread}`}
          >
            <div className={styles.iconWrapper} style={iconContainerStyle}>
              <Icon className={styles.icon} style={iconStyle} />
            </div>
            <div className={styles.content}>
              <div className={styles.topRow}>
                <p
                  className={`${styles.title} ${notif.read ? styles.read : styles.unread}`}
                >
                  {notif.title}
                </p>
                <span className={styles.time}>{notif.time}</span>
              </div>
              <p className={styles.desc}>{notif.desc}</p>
            </div>
            {!notif.read && <div className={styles.unreadDot} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CandidateDashboard({ activeTab }: CandidateDashboardProps) {
  const router = useRouter();
  const { logout } = useAuthContext();

  const { jobs, loading, error, setJobs } = useLatestJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { suggestions, loading: suggestionsLoading } = useSearchSuggestions({
    q: searchQuery,
  });

  const {
    applications,
    loading: appsLoading,
    refetch: refetchApps,
  } = useMyApplications();
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  const unreadNotifications = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const savedJobs = jobs.filter((j) => j.saved);
  const filteredJobs =
    activeTab === "saved"
      ? savedJobs.filter(
          (j) =>
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.company.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.company.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const handleSaveToggle = (id: number) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, saved: !j.saved } : j)),
    );
  };

  const NAV_ITEMS: {
    id: Tab;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { id: "feed", label: "Jobs", icon: Briefcase },
    { id: "saved", label: "Saved", icon: Bookmark, badge: savedJobs.length },
    { id: "applications", label: "Applications", icon: Layers },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className={styles.body} style={{ paddingTop: 0 }}>
      {/* ── Main Content ── */}
      <main className={styles.main} style={{ marginLeft: 0 }}>
        <div className={styles.contentWrapper}>
          {/* Feed & Saved: header + filter bar */}
          {(activeTab === "feed" || activeTab === "saved") && (
            <>
              <div className={styles.sectionHeader}>
                <div>
                  <h1>
                    {activeTab === "feed" ? "Recommended Jobs" : "Saved Jobs"}
                  </h1>
                  <p>
                    {activeTab === "feed"
                      ? `${filteredJobs.length} jobs with a high match for you`
                      : `${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""} saved`}
                  </p>
                </div>
                <button className={styles.filterBtn}>
                  <Filter className={styles.icon} /> Filters
                </button>
              </div>

              {/* Quick filter pills */}
              {activeTab === "feed" && (
                <div className={styles.filterPills}>
                  {[
                    "All",
                    "Remote",
                    "Series A",
                    "Series B",
                    "Seed",
                    "Full-time",
                  ].map((f) => (
                    <button
                      key={f}
                      className={`${styles.pill} ${f === "All" ? styles.active : ""}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}

              {/* Job list */}
              <div className={styles.jobList}>
                {loading ? (
                  <div className={styles.emptyState}>
                    <p>Loading jobs...</p>
                  </div>
                ) : error ? (
                  <div className={styles.emptyState}>
                    <p>{error}</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSaveToggle={handleSaveToggle}
                      onApply={(j) => setApplyingJob(j)}
                      isApplied={applications.some(
                        (app) => app.jobPublicId === job.publicId,
                      )}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <Bookmark className={styles.icon} />
                    <p>
                      {activeTab === "saved"
                        ? "You haven't saved any jobs yet."
                        : "No jobs found."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "applications" && (
            <ApplicationsView
              applications={applications}
              loading={appsLoading}
              error={null}
            />
          )}
          {activeTab === "notifications" && <NotificationsView />}
          {activeTab === "profile" && <ProfileView />}
        </div>
      </main>

      {/* ── Right Column (only on feed/saved) ── */}
      {(activeTab === "feed" || activeTab === "saved") && (
        <aside className={styles.asideRight}>
          {/* Activity card */}
          <div className={styles.widget}>
            <h3>Your Activity</h3>
            <div className={styles.statList}>
              {[
                {
                  label: "Applications",
                  value: applications.length,
                  icon: Layers,
                  variant: "primary",
                },
                {
                  label: "Saved jobs",
                  value: savedJobs.length,
                  icon: Bookmark,
                  variant: "emerald",
                },
                {
                  label: "Profile views",
                  value: MOCK_USER.profileViews,
                  icon: Globe,
                  variant: "blue",
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={styles.statItem}>
                    <div className={styles.labelGroup}>
                      <Icon
                        className={`${styles.icon} ${styles[stat.variant]}`}
                      />
                      <span>{stat.label}</span>
                    </div>
                    <span className={styles.value}>{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top companies */}
          <div className={styles.widget}>
            <h3>Featured Companies</h3>
            <div className={styles.companyList}>
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className={styles.companyItem}>
                  <div
                    className={styles.logo}
                    style={{
                      backgroundColor: job.logoBg,
                      color: job.logoColor,
                    }}
                  >
                    {job.logo}
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{job.company}</p>
                    <p className={styles.stage}>{job.stage}</p>
                  </div>
                  <ChevronRight className={styles.chevron} />
                </div>
              ))}
            </div>
          </div>

          {/* Skill tip */}
          <div
            className={`${styles.widget} ${styles.skillTip}`}
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--primary-light-rgb), 0.1), rgba(var(--primary-dark-rgb), 0.05))",
              borderColor: "rgba(var(--primary-light-rgb), 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <Zap
                className="h-4 w-4"
                style={{ color: "var(--primary-light)" }}
              />
              <span
                style={{
                  color: "var(--primary-light)",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Refyne Tip
              </span>
            </div>
            <p
              style={{
                color: "#d4d4d8",
                fontSize: "0.75rem",
                lineHeight: "1.5",
              }}
            >
              Candidates with a complete profile are{" "}
              <strong style={{ color: "#fff" }}>3x more likely</strong> to be
              contacted by startups.
            </p>
            <button
              style={{
                marginTop: "0.75rem",
                color: "var(--primary-light)",
                fontSize: "0.75rem",
                fontWeight: "600",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Complete profile →
            </button>
          </div>
        </aside>
      )}
      {/* Apply Modal */}
      {applyingJob && (
        <ApplyModal
          jobId={applyingJob.publicId}
          jobTitle={applyingJob.title}
          companyName={applyingJob.company}
          onClose={() => setApplyingJob(null)}
          onSuccess={() => refetchApps()}
        />
      )}
    </div>
  );
}
