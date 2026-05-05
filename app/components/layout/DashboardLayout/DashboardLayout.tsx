"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../../../context/AuthContext";
import { useSearchSuggestions } from "../../../hooks/useSearchSuggestions";
import {
  Briefcase,
  Bookmark,
  User,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Settings,
  LogOut,
  Zap,
  Layers,
  Star,
  Building2,
  Users
} from "lucide-react";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { suggestions, loading: suggestionsLoading } = useSearchSuggestions({ q: searchQuery });

  // Persistence for sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("refyne-sidebar-collapsed");
    if (saved !== null) {
      setSidebarCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newValue = !sidebarCollapsed;
    setSidebarCollapsed(newValue);
    localStorage.setItem("refyne-sidebar-collapsed", String(newValue));
  };

  const handleNavClick = (tabId: string) => {
    if (pathname === "/home") {
      // Already on home — just update the tab in parent state
      if (onTabChange) {
        onTabChange(tabId);
      }
    } else {
      // Coming from another page (e.g. job details) — go back to home
      // Pass the desired tab via sessionStorage so homepage can read it
      if (typeof window !== "undefined") {
        sessionStorage.setItem("refyne-pending-tab", tabId);
      }
      router.push("/home");
    }
  };

  const CANDIDATE_NAV = [
    { id: "feed", label: "Vagas", icon: Briefcase },
    { id: "saved", label: "Salvos", icon: Bookmark },
    { id: "applications", label: "Candidaturas", icon: Layers },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "profile", label: "Meu Perfil", icon: User },
  ];

  const STARTUP_NAV = [
    { id: "postings", label: "Minhas Vagas", icon: Briefcase },
    { id: "candidates", label: "Candidatos", icon: Users },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "profile", label: "Perfil da Startup", icon: User },
  ];

  const NAV_ITEMS = user?.userType === "STARTUP" ? STARTUP_NAV : CANDIDATE_NAV;

  return (
    <div className={styles.homeContainer}>
      {/* ── Top Navbar ── */}
      <header className={styles.header}>
        <div 
          className={`${styles.logo} ${sidebarCollapsed ? styles.collapsed : ""}`}
          onClick={() => router.push("/home")}
          style={{ cursor: 'pointer' }}
        >
          {sidebarCollapsed ? "R" : "REFYNE"}
        </div>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar vagas, empresas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />

          {searchFocused && searchQuery.trim().length > 0 && (
            <div className={styles.suggestionsDropdown}>
              {suggestionsLoading ? (
                <div className={styles.loadingItem}>Buscando sugestões...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion: any) => (
                  <div key={suggestion.id} className={styles.suggestionItem} onClick={() => {
                    router.push(`/jobs/${suggestion.publicId}`);
                    setSearchFocused(false);
                  }}>
                    <div className={styles.iconWrapper}>
                      <Briefcase size={16} />
                    </div>
                    <div className={styles.info}>
                      <span className={styles.title}>{suggestion.title}</span>
                      <span className={styles.subtitle}>{suggestion.companyName || suggestion.startupName || "Empresa"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyItem}>Nenhuma sugestão encontrada</div>
              )}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.iconBtn}>
            <Bell size={20} />
          </button>
          <button className={styles.iconBtn}>
            <Settings size={20} />
          </button>
          <div className={styles.userAvatar}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* ── Sidebar ── */}
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ""}`}>
          <button onClick={toggleSidebar} className={styles.collapseBtn}>
            {sidebarCollapsed ? <ChevronRight className={styles.collapseBtnIcon} /> : <ChevronLeft className={styles.collapseBtnIcon} />}
          </button>

          <div className={`${styles.userSection} ${sidebarCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.avatar}>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            {!sidebarCollapsed && (
              <div className={styles.info}>
                <p className={styles.name}>{user?.email?.split('@')[0]}</p>
                <p className={styles.role}>{user?.userType === "STARTUP" ? "Startup Admin" : "Candidate"}</p>
              </div>
            )}
          </div>

          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`${styles.navItem} ${isActive ? styles.active : ""} ${sidebarCollapsed ? styles.collapsed : ""}`}
                  title={sidebarCollapsed ? item.label : ""}
                >
                  <div className={styles.iconWrapper}>
                    <Icon className={styles.navIcon} />
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
              onClick={() => {
                logout();
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
        <main className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
