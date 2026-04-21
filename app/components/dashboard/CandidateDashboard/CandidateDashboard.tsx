"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLatestJobs, Job } from "../../../hooks/useLatestJobs";
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
import styles from "../../../home/home.module.scss";

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
    logoColor: "#CC97FF",
    logoBg: "#1a1030",
    status: "Em análise",
    statusVariant: "pending",
    statusIcon: AlertCircle,
    date: "29 Mar 2026",
    stage: "Entrevista técnica",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Orbit Systems",
    logo: "O",
    logoColor: "#60a5fa",
    logoBg: "#0d1628",
    status: "Aprovado",
    statusVariant: "approved",
    statusIcon: CircleCheck,
    date: "25 Mar 2026",
    stage: "Oferta enviada",
  },
  {
    id: 3,
    title: "React Native Engineer",
    company: "MobiStack",
    logo: "M",
    logoColor: "#f59e0b",
    logoBg: "#1a1408",
    status: "Encerrado",
    statusVariant: "closed",
    statusIcon: X,
    date: "18 Mar 2026",
    stage: "Não avançou",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nimbus AI visualizou seu perfil",
    desc: "O recrutador acessou seu perfil há 30 minutos.",
    time: "30min",
    read: false,
    icon: User,
    iconColor: "text-[#CC97FF]",
    iconBg: "bg-[#CC97FF]/10",
  },
  {
    id: 2,
    title: "Nova vaga com 97% de match!",
    desc: "Senior Frontend Engineer na Nimbus AI.",
    time: "2h",
    read: false,
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/10",
  },
  {
    id: 3,
    title: "Atualização na candidatura",
    desc: "Orbit Systems avançou você para a próxima etapa.",
    time: "1d",
    read: true,
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
  },
  {
    id: 4,
    title: "Seu perfil está incompleto",
    desc: "Adicione sua experiência para aumentar seu match score.",
    time: "2d",
    read: true,
    icon: AlertCircle,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "feed" | "saved" | "applications" | "profile" | "notifications";

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({
  job,
  onSaveToggle,
}: {
  job: Job;
  onSaveToggle: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.jobCard}>
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

      {/* Tags */}
      <div className={styles.tags}>
        {job.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Description toggle */}
      {expanded && (
        <p className={styles.description}>
          {job.description}
        </p>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.applyBtn}>
          Candidatar-se
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className={styles.moreBtn}
        >
          {expanded ? "Menos" : "Ver mais"}
        </button>
        <button className={styles.externalBtn}>
          <ArrowUpRight className={styles.icon} />
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
            <div className={styles.avatar}>
              {MOCK_USER.initials}
            </div>
            <button className={styles.editBtn}>
              Editar perfil
            </button>
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
              <div className={styles.label}>Visualizações</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.val}>{MOCK_USER.appliedCount}</div>
              <div className={styles.label}>Candidaturas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={styles.skillsCard}>
        <h3>Habilidades</h3>
        <div className={styles.skillsGrid}>
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Go", "GraphQL", "AWS"].map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className={styles.experienceCard}>
        <h3>Experiência</h3>
        <div className={styles.experienceList}>
          {[
            { role: "Senior Full Stack Developer", company: "Deco.cx", period: "Jan 2024 – Presente", desc: "Liderança técnica do squad de plataforma. Stack: React, Deno, TypeScript." },
            { role: "Frontend Engineer", company: "Nuvemshop", period: "Jun 2022 – Dec 2023", desc: "Desenvolvimento de componentes do Design System e features do painel admin." },
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

function ApplicationsView() {
  return (
    <div className={styles.applicationsView}>
      <div className={styles.header}>
        <h1>Minhas Candidaturas</h1>
        <p>{MOCK_APPLICATIONS.length} total</p>
      </div>
      {MOCK_APPLICATIONS.map((app) => {
        const StatusIcon = app.statusIcon;
        return (
          <div key={app.id} className={styles.appCard}>
            <div className={styles.row}>
              <div
                className={styles.logo}
                style={{ backgroundColor: app.logoBg, color: app.logoColor }}
              >
                {app.logo}
              </div>
              <div className={styles.info}>
                <p className={styles.role}>{app.title}</p>
                <p className={styles.company}>{app.company}</p>
                <p className={styles.stage}>{app.stage}</p>
              </div>
              <div className={styles.statusCol}>
                <span className={`${styles.statusBadge} ${styles[app.statusVariant]}`}>
                  <StatusIcon className={styles.icon} />
                  {app.status}
                </span>
                <p className={styles.date}>{app.date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NotificationsView() {
  return (
    <div className={styles.notificationsView}>
      <div className={styles.header}>
        <h1>Notificações</h1>
        <button className={styles.markAll}>Marcar todas como lidas</button>
      </div>
      {MOCK_NOTIFICATIONS.map((notif) => {
        const Icon = notif.icon;
        // Simple mapping for icon container styling
        const iconContainerStyle = {
          backgroundColor: notif.iconBg.includes('CC97FF') ? 'rgba(204, 151, 255, 0.1)' :
            notif.iconBg.includes('yellow') ? 'rgba(234, 179, 8, 0.1)' :
              notif.iconBg.includes('emerald') ? 'rgba(16, 185, 129, 0.1)' :
                'rgba(251, 146, 60, 0.1)'
        };
        const iconStyle = {
          color: notif.iconColor.includes('CC97FF') ? '#CC97FF' :
            notif.iconColor.includes('yellow') ? '#eab308' :
              notif.iconColor.includes('emerald') ? '#10b981' :
                '#fb923c'
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
                <p className={`${styles.title} ${notif.read ? styles.read : styles.unread}`}>
                  {notif.title}
                </p>
                <span className={styles.time}>{notif.time}</span>
              </div>
              <p className={styles.desc}>{notif.desc}</p>
            </div>
            {!notif.read && (
              <div className={styles.unreadDot} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CandidateDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const { jobs, loading, error, setJobs } = useLatestJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadNotifications = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const savedJobs = jobs.filter((j) => j.saved);
  const filteredJobs =
    activeTab === "saved"
      ? savedJobs.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSaveToggle = (id: number) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, saved: !j.saved } : j))
    );
  };

  const NAV_ITEMS: {
    id: Tab;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
      { id: "feed", label: "Vagas", icon: Briefcase },
      { id: "saved", label: "Salvos", icon: Bookmark, badge: savedJobs.length },
      { id: "applications", label: "Candidaturas", icon: Layers },
      { id: "notifications", label: "Notificações", icon: Bell, badge: unreadNotifications },
      { id: "profile", label: "Meu Perfil", icon: User },
    ];

  return (
    <div className={styles.homeContainer}>
      {/* ── Top Navbar ── */}
      <header className={styles.header}>
        {/* Logo */}
        <div className={`${styles.logo} ${sidebarCollapsed ? styles.collapsed : ""}`}>
          {sidebarCollapsed ? "R" : "REFYNE"}
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar vagas, empresas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right actions */}
        <div className={styles.actions}>
          <button className={styles.iconBtn}>
            <Bell className={styles.iconMd} />
            {unreadNotifications > 0 && (
              <span className={styles.badge} />
            )}
          </button>
          <button className={styles.iconBtn}>
            <Settings className={styles.iconMd} />
          </button>
          {/* Avatar */}
          <div className={styles.userAvatar}>
            {MOCK_USER.initials}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* ── Sidebar ── */}
        <aside
          className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""}`}
        >
          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={styles.collapseBtn}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className={styles.collapseBtnIcon} />
            ) : (
              <ChevronLeft className={styles.collapseBtnIcon} />
            )}
          </button>

          {/* User mini profile */}
          <div className={`${styles.userSection} ${sidebarCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.avatar}>
              {MOCK_USER.initials}
            </div>
            {!sidebarCollapsed && (
              <div className={styles.info}>
                <p className={styles.name}>{MOCK_USER.name}</p>
                <p className={styles.role}>{MOCK_USER.role}</p>
              </div>
            )}
          </div>

          {/* Match score banner */}
          {!sidebarCollapsed && (
            <div className={styles.matchBanner}>
              <div className={styles.bannerHeader}>
                <span>Match Score</span>
                <Star className={styles.starIcon} />
              </div>
              <div className={styles.score}>{MOCK_USER.matchScore}%</div>
              <div className={styles.progressBar}>
                <div
                  className={styles.fill}
                  style={{ width: `${MOCK_USER.matchScore}%` }}
                />
              </div>
            </div>
          )}

          {/* Nav items */}
          <nav className={styles.nav}>
            {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`${styles.navItem} ${activeTab === id ? styles.active : ""} ${sidebarCollapsed ? styles.collapsed : ""}`}
              >
                <div className={styles.iconWrapper}>
                  <Icon className={styles.navIcon} />
                  {badge ? (
                    <span className={styles.itemBadge}>
                      {badge}
                    </span>
                  ) : null}
                </div>
                {!sidebarCollapsed && (
                  <span className={styles.label}>{label}</span>
                )}
                {!sidebarCollapsed && activeTab === id && (
                  <ChevronRight className={styles.chevron} />
                )}
              </button>
            ))}
          </nav>

          {/* Collapse toggle + Logout */}
          <div className={styles.bottomNav}>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("profileCompleted");
                router.push("/auth");
              }}
              className={`${styles.navItem} ${styles.logout} ${sidebarCollapsed ? styles.collapsed : ""}`}
            >
              <LogOut className={styles.navIcon} />
              {!sidebarCollapsed && <span className={styles.label}>Sair</span>}
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main
          className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : ""}`}
        >
          <div className={styles.contentWrapper}>

            {/* Feed & Saved: header + filter bar */}
            {(activeTab === "feed" || activeTab === "saved") && (
              <>
                <div className={styles.sectionHeader}>
                  <div>
                    <h1>
                      {activeTab === "feed" ? "Vagas Recomendadas" : "Vagas Salvas"}
                    </h1>
                    <p>
                      {activeTab === "feed"
                        ? `${filteredJobs.length} vagas com alto match para você`
                        : `${filteredJobs.length} vaga${filteredJobs.length !== 1 ? "s" : ""} salva${filteredJobs.length !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <button className={styles.filterBtn}>
                    <Filter className={styles.icon} /> Filtros
                  </button>
                </div>

                {/* Quick filter pills */}
                {activeTab === "feed" && (
                  <div className={styles.filterPills}>
                    {["Todos", "Remote", "Series A", "Series B", "Seed", "Full-time"].map((f) => (
                      <button
                        key={f}
                        className={`${styles.pill} ${f === "Todos" ? styles.active : ""}`}
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
                      <p>Carregando vagas...</p>
                    </div>
                  ) : error ? (
                    <div className={styles.emptyState}>
                      <p>{error}</p>
                    </div>
                  ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <Bookmark className={styles.icon} />
                      <p>
                        {activeTab === "saved"
                          ? "Você ainda não salvou nenhuma vaga."
                          : "Nenhuma vaga encontrada."}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "applications" && <ApplicationsView />}
            {activeTab === "notifications" && <NotificationsView />}
            {activeTab === "profile" && <ProfileView />}
          </div>
        </main>

        {/* ── Right Column (only on feed/saved) ── */}
        {(activeTab === "feed" || activeTab === "saved") && (
          <aside className={styles.asideRight}>
            {/* Activity card */}
            <div className={styles.widget}>
              <h3>Sua Atividade</h3>
              <div className={styles.statList}>
                {[
                  { label: "Candidaturas", value: MOCK_USER.appliedCount, icon: Layers, variant: "primary" },
                  { label: "Vagas salvas", value: savedJobs.length, icon: Bookmark, variant: "emerald" },
                  { label: "Visualizações", value: MOCK_USER.profileViews, icon: Globe, variant: "blue" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={styles.statItem}>
                      <div className={styles.labelGroup}>
                        <Icon className={`${styles.icon} ${styles[stat.variant]}`} />
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
              <h3>Empresas em Destaque</h3>
              <div className={styles.companyList}>
                {jobs.slice(0, 3).map((job) => (
                  <div key={job.id} className={styles.companyItem}>
                    <div
                      className={styles.logo}
                      style={{ backgroundColor: job.logoBg, color: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>
                        {job.company}
                      </p>
                      <p className={styles.stage}>{job.stage}</p>
                    </div>
                    <ChevronRight className={styles.chevron} />
                  </div>
                ))}
              </div>
            </div>

            {/* Skill tip */}
            <div className={`${styles.widget} ${styles.skillTip}`} style={{
              background: 'linear-gradient(135deg, rgba(204, 151, 255, 0.1), rgba(156, 72, 234, 0.05))',
              borderColor: 'rgba(204, 151, 255, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Zap className="h-4 w-4" style={{ color: '#CC97FF' }} />
                <span style={{ color: '#CC97FF', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dica Refyne</span>
              </div>
              <p style={{ color: '#d4d4d8', fontSize: '0.75rem', lineHeight: '1.5' }}>
                Candidatos com perfil completo têm <strong style={{ color: '#fff' }}>3x mais chances</strong> de serem contactados pelas startups.
              </p>
              <button style={{ marginTop: '0.75rem', color: '#CC97FF', fontSize: '0.75rem', fontWeight: '600', border: 'none', background: 'none', cursor: 'pointer' }}>
                Completar perfil →
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
