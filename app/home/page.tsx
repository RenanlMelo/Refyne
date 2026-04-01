"use client";

import { useState } from "react";
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

const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Nimbus AI",
    stage: "Series A",
    logo: "N",
    logoColor: "#CC97FF",
    logoBg: "#1a1030",
    location: "Remote",
    salary: "R$ 18k – 24k",
    type: "Full-time",
    equity: "0.1% – 0.5%",
    tags: ["React", "TypeScript", "GraphQL"],
    posted: "2h atrás",
    match: 97,
    hot: true,
    saved: false,
    description:
      "Lidere a arquitetura do nosso produto principal. Você vai trabalhar diretamente com o CTO para definir o stack e cultura de engenharia.",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Vertico",
    stage: "Seed",
    logo: "V",
    logoColor: "#34d399",
    logoBg: "#0d1f1a",
    location: "São Paulo, SP · Híbrido",
    salary: "R$ 10k – 14k",
    type: "Full-time",
    equity: "0.5% – 1%",
    tags: ["Figma", "Design System", "UX Research"],
    posted: "5h atrás",
    match: 88,
    hot: false,
    saved: true,
    description:
      "Primeiro designer da empresa. Construa do zero nosso design system e a identidade visual do produto. Autonomia total.",
  },
  {
    id: 3,
    title: "Backend Engineer (Go)",
    company: "Fluxo Labs",
    stage: "Series B",
    logo: "F",
    logoColor: "#60a5fa",
    logoBg: "#0d1628",
    location: "Remote",
    salary: "R$ 22k – 30k",
    type: "Full-time",
    equity: "0.05% – 0.2%",
    tags: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
    posted: "1d atrás",
    match: 82,
    hot: true,
    saved: false,
    description:
      "Impacto direto na infra que processa +10M de transações/dia. Stack moderno, processo seletivo ágil e time sênior.",
  },
  {
    id: 4,
    title: "Growth Marketing Lead",
    company: "Zeta Finance",
    stage: "Seed",
    logo: "Z",
    logoColor: "#f59e0b",
    logoBg: "#1a1408",
    location: "São Paulo, SP · Presencial",
    salary: "R$ 9k – 13k",
    type: "Full-time",
    equity: "0.3% – 0.8%",
    tags: ["Growth", "SEO", "Data Analytics"],
    posted: "2d atrás",
    match: 75,
    hot: false,
    saved: false,
    description:
      "Seja o primeiro lead de marketing da Zeta. Você vai construir todos os canais de aquisição do zero com orçamento para experimentar.",
  },
  {
    id: 5,
    title: "Data Engineer",
    company: "Pulsar Health",
    stage: "Series A",
    logo: "P",
    logoColor: "#f472b6",
    logoBg: "#1a0b14",
    location: "Remote",
    salary: "R$ 16k – 20k",
    type: "Full-time",
    equity: "0.1% – 0.3%",
    tags: ["Python", "dbt", "Spark", "Airflow"],
    posted: "3d atrás",
    match: 79,
    hot: false,
    saved: true,
    description:
      "Monte a fundação de dados que vai guiar decisões clínicas para milhares de pacientes. Trabalho com impacto real.",
  },
];

const MOCK_APPLICATIONS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Nimbus AI",
    logo: "N",
    logoColor: "#CC97FF",
    logoBg: "#1a1030",
    status: "Em análise",
    statusColor: "text-yellow-400",
    statusBg: "bg-yellow-400/10",
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
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
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
    statusColor: "text-zinc-500",
    statusBg: "bg-zinc-500/10",
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
  job: (typeof MOCK_JOBS)[0];
  onSaveToggle: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-zinc-900/60 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Company logo */}
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
            style={{ backgroundColor: job.logoBg, color: job.logoColor }}
          >
            {job.logo}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-base leading-tight">
                {job.title}
              </h3>
              {job.hot && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[10px] font-bold uppercase tracking-wide">
                  <Flame className="h-2.5 w-2.5" /> Hot
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm mt-0.5">
              {job.company}
              <span className="mx-1.5 text-zinc-700">·</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-400">
                {job.stage}
              </span>
            </p>
          </div>
        </div>

        {/* Match + Save */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CC97FF]/10 border border-[#CC97FF]/20">
            <Star className="h-3 w-3 text-[#CC97FF] fill-[#CC97FF]" />
            <span className="text-[#CC97FF] text-xs font-bold">
              {job.match}% match
            </span>
          </div>
          <button
            onClick={() => onSaveToggle(job.id)}
            className={`p-1.5 rounded-lg transition-all ${
              job.saved
                ? "text-[#CC97FF] bg-[#CC97FF]/10"
                : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${job.saved ? "fill-[#CC97FF]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" /> {job.salary}
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" /> Equity: {job.equity}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {job.posted}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 text-xs font-medium border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description toggle */}
      {expanded && (
        <p className="text-zinc-400 text-sm mt-4 leading-relaxed border-t border-white/5 pt-4">
          {job.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/5">
        <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] text-white text-sm font-semibold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(204,151,255,0.3)] transition-all active:scale-[0.99]">
          Candidatar-se
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-all"
        >
          {expanded ? "Menos" : "Ver mais"}
        </button>
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="space-y-4">
      {/* Profile header card */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-br from-[#CC97FF]/20 to-[#9C48EA]/30 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#CC97FF]/10 to-transparent" />
        </div>
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] flex items-center justify-center text-white text-xl font-bold border-4 border-[#0f0f0f]">
              {MOCK_USER.initials}
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm hover:bg-white/10 transition-all">
              Editar perfil
            </button>
          </div>
          <h2 className="text-white font-bold text-xl">{MOCK_USER.name}</h2>
          <p className="text-zinc-400 text-sm mt-0.5">{MOCK_USER.role}</p>
          <p className="text-zinc-600 text-xs mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {MOCK_USER.location}
          </p>
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-[#CC97FF]/10 rounded-xl p-3 border border-[#CC97FF]/20 text-center">
              <div className="text-[#CC97FF] font-bold text-lg">{MOCK_USER.matchScore}%</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wide mt-0.5">Match Score</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 text-center">
              <div className="text-white font-bold text-lg">{MOCK_USER.profileViews}</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wide mt-0.5">Visualizações</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 text-center">
              <div className="text-white font-bold text-lg">{MOCK_USER.appliedCount}</div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wide mt-0.5">Candidaturas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Habilidades</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Go", "GraphQL", "AWS"].map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-white font-semibold">Experiência</h3>
        {[
          { role: "Senior Full Stack Developer", company: "Deco.cx", period: "Jan 2024 – Presente", desc: "Liderança técnica do squad de plataforma. Stack: React, Deno, TypeScript." },
          { role: "Frontend Engineer", company: "Nuvemshop", period: "Jun 2022 – Dec 2023", desc: "Desenvolvimento de componentes do Design System e features do painel admin." },
        ].map((exp, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
              <Building2 className="h-4 w-4 text-zinc-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{exp.role}</p>
              <p className="text-[#CC97FF] text-xs">{exp.company}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{exp.period}</p>
              <p className="text-zinc-400 text-xs mt-1.5">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationsView() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-semibold text-lg">Minhas Candidaturas</h2>
        <span className="text-zinc-500 text-sm">{MOCK_APPLICATIONS.length} total</span>
      </div>
      {MOCK_APPLICATIONS.map((app) => {
        const StatusIcon = app.statusIcon;
        return (
          <div key={app.id} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                style={{ backgroundColor: app.logoBg, color: app.logoColor }}
              >
                {app.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{app.title}</p>
                <p className="text-zinc-400 text-xs">{app.company}</p>
                <p className="text-zinc-600 text-xs mt-1">{app.stage}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${app.statusColor} ${app.statusBg}`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {app.status}
                </span>
                <p className="text-zinc-600 text-[10px] mt-1.5">{app.date}</p>
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
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-semibold text-lg">Notificações</h2>
        <button className="text-[#CC97FF] text-xs hover:underline">Marcar todas como lidas</button>
      </div>
      {MOCK_NOTIFICATIONS.map((notif) => {
        const Icon = notif.icon;
        return (
          <div
            key={notif.id}
            className={`flex gap-4 p-4 rounded-2xl border transition-all ${
              notif.read
                ? "bg-zinc-900/20 border-white/5"
                : "bg-zinc-900/50 border-white/10"
            }`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${notif.iconBg}`}>
              <Icon className={`h-4 w-4 ${notif.iconColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-medium leading-snug ${notif.read ? "text-zinc-300" : "text-white"}`}>
                  {notif.title}
                </p>
                <span className="text-zinc-600 text-xs shrink-0">{notif.time}</span>
              </div>
              <p className="text-zinc-500 text-xs mt-0.5">{notif.desc}</p>
            </div>
            {!notif.read && (
              <div className="h-2 w-2 rounded-full bg-[#CC97FF] mt-1.5 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [jobs, setJobs] = useState(MOCK_JOBS);
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* ── Top Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-4 gap-4">
        {/* Logo */}
        <div className="text-white font-black tracking-[0.2em] text-lg w-12 shrink-0 flex items-center">
          {sidebarCollapsed ? "R" : "REFYNE"}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar vagas, empresas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/60 border border-white/5 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#CC97FF]/40 focus:border-[#CC97FF]/30 transition-all"
          />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <button className="relative p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#CC97FF]" />
            )}
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
            <Settings className="h-5 w-5" />
          </button>
          {/* Avatar */}
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            {MOCK_USER.initials}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 pt-16">
        {/* ── Sidebar ── */}
        <aside
          className={`fixed left-0 top-16 bottom-0 z-40 flex flex-col bg-[#0d0d0d] border-r border-white/5 transition-all duration-300 ${
            sidebarCollapsed ? "w-[68px]" : "w-[220px]"
          }`}
        >
          {/* User mini profile */}
          <div className={`p-3 border-b border-white/5 flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {MOCK_USER.initials}
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-white text-xs font-semibold truncate">{MOCK_USER.name}</p>
                <p className="text-zinc-500 text-[10px] truncate">{MOCK_USER.role}</p>
              </div>
            )}
          </div>

          {/* Match score banner */}
          {!sidebarCollapsed && (
            <div className="mx-3 mt-3 p-3 rounded-xl bg-[#CC97FF]/8 border border-[#CC97FF]/15">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Match Score</span>
                <Star className="h-3 w-3 text-[#CC97FF] fill-[#CC97FF]" />
              </div>
              <div className="text-[#CC97FF] font-bold text-xl mt-0.5">{MOCK_USER.matchScore}%</div>
              <div className="mt-2 h-1 rounded-full bg-white/5">
                <div
                  className="h-1 rounded-full bg-gradient-to-r from-[#CC97FF] to-[#9C48EA]"
                  style={{ width: `${MOCK_USER.matchScore}%` }}
                />
              </div>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex-1 p-2 mt-2 space-y-0.5">
            {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
                  activeTab === id
                    ? "bg-[#CC97FF]/10 text-[#CC97FF]"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
              >
                <div className="relative shrink-0">
                  <Icon className="h-5 w-5" />
                  {badge ? (
                    <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-[#CC97FF] text-[8px] font-bold text-white flex items-center justify-center">
                      {badge}
                    </span>
                  ) : null}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
                {!sidebarCollapsed && activeTab === id && (
                  <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* Collapse toggle + Logout */}
          <div className="p-2 border-t border-white/5 space-y-0.5">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all ${sidebarCollapsed ? "justify-center" : ""}`}
            >
              <MessageSquare className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Recolher</span>}
            </button>
            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-500/5 transition-all ${sidebarCollapsed ? "justify-center" : ""}`}>
              <LogOut className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Sair</span>}
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-[68px]" : "ml-[220px]"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 py-6">

            {/* Feed & Saved: header + filter bar */}
            {(activeTab === "feed" || activeTab === "saved") && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h1 className="text-white font-bold text-xl">
                      {activeTab === "feed" ? "Vagas Recomendadas" : "Vagas Salvas"}
                    </h1>
                    <p className="text-zinc-500 text-sm mt-0.5">
                      {activeTab === "feed"
                        ? `${filteredJobs.length} vagas com alto match para você`
                        : `${filteredJobs.length} vaga${filteredJobs.length !== 1 ? "s" : ""} salva${filteredJobs.length !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-zinc-400 text-sm hover:text-white hover:bg-white/10 transition-all">
                    <Filter className="h-4 w-4" /> Filtros
                  </button>
                </div>

                {/* Quick filter pills */}
                {activeTab === "feed" && (
                  <div className="flex gap-2 flex-wrap mb-5">
                    {["Todos", "Remote", "Series A", "Series B", "Seed", "Full-time"].map((f) => (
                      <button
                        key={f}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          f === "Todos"
                            ? "bg-[#CC97FF]/10 border-[#CC97FF]/30 text-[#CC97FF]"
                            : "bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}

                {/* Job list */}
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} onSaveToggle={handleSaveToggle} />
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <Bookmark className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                      <p className="text-zinc-400 text-sm">
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
          <aside className="hidden xl:flex flex-col gap-4 w-72 shrink-0 p-4 pt-6">
            {/* Activity card */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5">
              <h3 className="text-white text-sm font-semibold mb-4">Sua Atividade</h3>
              <div className="space-y-3">
                {[
                  { label: "Candidaturas", value: MOCK_USER.appliedCount, icon: Layers, color: "text-[#CC97FF]" },
                  { label: "Vagas salvas", value: savedJobs.length, icon: Bookmark, color: "text-emerald-400" },
                  { label: "Visualizações", value: MOCK_USER.profileViews, icon: Globe, color: "text-blue-400" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                        <span className="text-zinc-400 text-xs">{stat.label}</span>
                      </div>
                      <span className="text-white text-sm font-semibold">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top companies */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5">
              <h3 className="text-white text-sm font-semibold mb-4">Empresas em Destaque</h3>
              <div className="space-y-3">
                {MOCK_JOBS.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center gap-3 group cursor-pointer">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: job.logoBg, color: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-200 text-xs font-medium group-hover:text-white transition-colors truncate">
                        {job.company}
                      </p>
                      <p className="text-zinc-600 text-[10px]">{job.stage}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skill tip */}
            <div className="bg-gradient-to-br from-[#CC97FF]/10 to-[#9C48EA]/5 border border-[#CC97FF]/15 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-[#CC97FF]" />
                <span className="text-[#CC97FF] text-xs font-bold uppercase tracking-wide">Dica Refyne</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Candidatos com perfil completo têm <strong className="text-white">3x mais chances</strong> de serem contactados pelas startups.
              </p>
              <button className="mt-3 text-[#CC97FF] text-xs font-semibold hover:underline">
                Completar perfil →
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
