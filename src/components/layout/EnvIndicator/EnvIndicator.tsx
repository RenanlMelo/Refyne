"use client";

import { useEffect, useState } from "react";
import styles from "./EnvIndicator.module.scss";
import { Server, ExternalLink, Terminal, ShieldAlert } from "lucide-react";
import { API_BASE_URL } from "@/utils/api";

export default function EnvIndicator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!isMounted) return null;

  // Determine active environment based on hostname or API_BASE_URL
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      API_BASE_URL.includes("localhost") ||
      API_BASE_URL.includes("127.0.0.1"));

  const envLabel = isLocal ? "Local Dev" : "Produção";
  const swaggerUrl = isLocal
    ? "http://localhost:8000/swagger-ui/index.html#/"
    : "https://refyne-server.onrender.com/swagger-ui/index.html#/";

  return (
    <div className={styles.container}>
      {/* --- Floating Pill Indicator --- */}
      <button
        className={`${styles.pill} ${isLocal ? styles.localPill : styles.prodPill}`}
        onClick={() => setIsOpen(!isOpen)}
        title={`Ambiente: ${envLabel} | Clique para detalhes`}
      >
        <span className={styles.dot}></span>
        <span className={styles.label}>{envLabel}</span>
      </button>

      {/* --- Expanded Details Modal/Dropdown --- */}
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.menu}>
            <div className={styles.header}>
              <Server size={14} className={styles.headerIcon} />
              <span>Conexão de Sistema</span>
            </div>

            <div className={styles.content}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Ambiente:</span>
                <span className={`${styles.detailValue} ${isLocal ? styles.localText : styles.prodText}`}>
                  {isLocal ? "Desenvolvimento Local" : "Produção (Live)"}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>API Backend:</span>
                <span className={styles.detailValue} title={API_BASE_URL}>
                  {API_BASE_URL}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Frontend:</span>
                <span className={styles.detailValue} title={origin}>
                  {origin}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href={swaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.swaggerLink}
              >
                <Terminal size={14} />
                <span>Abrir Swagger UI</span>
                <ExternalLink size={12} className={styles.externalIcon} />
              </a>
            </div>

            {isLocal && (
              <div className={styles.warningAlert}>
                <ShieldAlert size={12} />
                <span>Conectado ao banco de dados e servidor locais.</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
