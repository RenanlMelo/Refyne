"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useStartupJobs } from "../../../hooks/useStartupJobs";
import { PostJobModal } from "./PostJobModal";
import { Job } from "../../../hooks/useLatestJobs";
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

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <MapPin className={styles.icon} /> {job.location}
        </span>
        <span className={styles.metaItem}>
          <DollarSign className={styles.icon} /> {job.salary}
        </span>
        {job.equity && (
          <span className={styles.metaItem}>
            <TrendingUp className={styles.icon} /> {job.equity}
          </span>
        )}
        <span className={styles.metaItem}>
          <Clock className={styles.icon} /> {job.posted}
        </span>
      </div>

      <div className={styles.tags}>
        {job.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {expanded && (
        <div className={styles.expandedContent} style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }} data-color-mode="dark">
            <h4 style={{ color: "#CC97FF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Description</h4>
            <MarkdownPreview source={job.description} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
          </div>
          {job.requirements && (
            <div data-color-mode="dark">
              <h4 style={{ color: "#CC97FF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Requirements</h4>
              <MarkdownPreview source={job.requirements} style={{ backgroundColor: "transparent", fontSize: "0.9rem" }} />
            </div>
          )}
        </div>
      )}

      <div className={styles.actions} style={{ marginTop: "1rem" }}>
        <button 
          onClick={() => setExpanded(!expanded)}
          className={styles.moreBtn}
          style={{ background: "transparent", border: "none", color: "#CC97FF", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {expanded ? "Show Less" : "View Details"}
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}

export function StartupDashboard() {
  const router = useRouter();
  const { actions } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("postings");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { jobs, loading, error, refetch } = useStartupJobs();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("profileCompleted");
    router.push("/");
  };

  const navItems: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: "postings", label: "My Postings", icon: Briefcase, badge: jobs.length },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Company Profile", icon: User },
  ];

  const filteredJobs = jobs.filter(
    (j) => j.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={`${styles.logo} ${sidebarCollapsed ? styles.collapsed : ""}`}>
          {sidebarCollapsed ? "R" : "REFYNE"}
        </div>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search postings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn}><Bell className={styles.iconMd} /></button>
          <button className={styles.iconBtn}><Settings className={styles.iconMd} /></button>
          <div className={styles.userAvatar}>S</div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""}`}>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={styles.collapseBtn}>
            {sidebarCollapsed ? <ChevronRight className={styles.collapseBtnIcon} /> : <ChevronLeft className={styles.collapseBtnIcon} />}
          </button>

          <div className={`${styles.userSection} ${sidebarCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.avatar}>S</div>
            {!sidebarCollapsed && (
              <div className={styles.info}>
                <p className={styles.name}>Startup Admin</p>
                <p className={styles.role}>Hiring Manager</p>
              </div>
            )}
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`${styles.navItem} ${isActive ? styles.active : ""} ${sidebarCollapsed ? styles.collapsed : ""}`}
                  title={sidebarCollapsed ? item.label : ""}
                >
                  <div className={styles.iconWrapper}>
                    <Icon className={styles.navIcon} />
                    {item.badge !== undefined && item.badge > 0 ? (
                      <span className={styles.itemBadge}>{item.badge}</span>
                    ) : null}
                  </div>
                  {!sidebarCollapsed && <span className={styles.label}>{item.label}</span>}
                  {!sidebarCollapsed && isActive && (
                    <ChevronRight className={styles.chevron} />
                  )}
                </button>
              );
            })}
          </nav>

          <div className={styles.bottomNav}>
            <button
              onClick={handleLogout}
              className={`${styles.navItem} ${styles.logout} ${sidebarCollapsed ? styles.collapsed : ""}`}
              title="Log out"
            >
              <LogOut className={styles.navIcon} />
              {!sidebarCollapsed && <span className={styles.label}>Sair</span>}
            </button>
          </div>
        </aside>

        <main
          className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : ""}`}
        >
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
      </div>

      {isPostModalOpen && (
        <PostJobModal
          onClose={() => setIsPostModalOpen(false)}
          onSuccess={() => {
            setIsPostModalOpen(false);
            refetch(); // Refresh the list of jobs!
          }}
        />
      )}
    </div>
  );
}
