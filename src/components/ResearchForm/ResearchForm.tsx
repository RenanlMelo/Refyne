"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, Loader } from "lucide-react";
import styles from "./ResearchForm.module.scss";
import CustomSelect from "./CustomSelect";

/* ------------------------------------------------------------------ */
/*  Types                                                                */
/* ------------------------------------------------------------------ */

export type FormVariant = "candidate" | "startup";

interface CandidateData {
  fullName: string;
  area: string;
  seniority: string;
  equityInterest: string;
  frustration: string;
  email: string;
}

interface StartupData {
  companyName: string;
  stage: string;
  hoursLost: string;
  offersEquity: string;
  hardestSkill: string;
  email: string;
}

interface ResearchFormProps {
  variant: FormVariant;
}

const SENIORITY_OPTIONS = [
  { value: "Estagiário", label: "Intern (Estagiário)" },
  { value: "Júnior", label: "Junior" },
  { value: "Pleno", label: "Mid-level (Pleno)" },
  { value: "Sênior", label: "Senior" },
  { value: "Especialista/Lead", label: "Specialist / Lead" },
];

const EQUITY_OPTIONS = [
  { value: "Sim", label: "Yes" },
  { value: "Não", label: "No" },
];

const STAGE_OPTIONS = [
  { value: "Ideia", label: "Idea" },
  { value: "MVP", label: "MVP" },
  { value: "Tração", label: "Traction" },
  { value: "Escala", label: "Scale" },
];

const HOURS_OPTIONS = [
  { value: "Menos de 2h", label: "Less than 2h" },
  { value: "2 a 5h", label: "2–5h" },
  { value: "5 a 10h", label: "5–10h" },
  { value: "Mais de 10h", label: "More than 10h" },
];

const OFFERS_EQUITY_OPTIONS = [
  { value: "Sim", label: "Yes" },
  { value: "Não", label: "No" },
];

const HARD_SKILL_OPTIONS = [
  { value: "Técnica", label: "Technical" },
  { value: "Comportamental", label: "Behavioral" },
  { value: "Ambas", label: "Both equally" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                            */
/* ------------------------------------------------------------------ */

export default function ResearchForm({ variant }: ResearchFormProps) {
  const isCandidate = variant === "candidate";

  const [candidateData, setCandidateData] = useState<CandidateData>({
    fullName: "",
    area: "",
    seniority: "",
    equityInterest: "",
    frustration: "",
    email: "",
  });

  const [startupData, setStartupData] = useState<StartupData>({
    companyName: "",
    stage: "",
    hoursLost: "",
    offersEquity: "",
    hardestSkill: "",
    email: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const updateCandidate = (field: keyof CandidateData, value: string) =>
    setCandidateData((prev) => ({ ...prev, [field]: value }));

  const updateStartup = (field: keyof StartupData, value: string) =>
    setStartupData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = isCandidate
      ? { variant: "candidate", ...candidateData }
      : { variant: "startup", ...startupData };

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("submission_failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  /* ---- Success state ---- */
  if (status === "success") {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <CheckCircle size={40} />
        </div>
        <h3>Thank you for your feedback! 🎉</h3>
        <p>
          {isCandidate
            ? "Your insights are crucial for our team. We'll use this data to refine and build a better platform for you."
            : "Your feedback helps our team understand exactly what founders need. We'll use these insights to refine the platform."}
        </p>
      </div>
    );
  }

  /* ---- Candidate Form ---- */
  if (isCandidate) {
    return (
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="wl-fullname">Full Name</label>
            <input
              id="wl-fullname"
              type="text"
              placeholder="Ana Souza"
              required
              value={candidateData.fullName}
              onChange={(e) => updateCandidate("fullName", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="wl-area">Area of Expertise</label>
            <input
              id="wl-area"
              type="text"
              placeholder="Engineering, Product, Design…"
              required
              value={candidateData.area}
              onChange={(e) => updateCandidate("area", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="wl-seniority">Experience Level</label>
            <CustomSelect
              id="wl-seniority"
              placeholder="Select level…"
              options={SENIORITY_OPTIONS}
              value={candidateData.seniority}
              onChange={(v) => updateCandidate("seniority", v)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="wl-equity">
              Would you accept lower salary for Equity?
            </label>
            <CustomSelect
              id="wl-equity"
              placeholder="Select…"
              options={EQUITY_OPTIONS}
              value={candidateData.equityInterest}
              onChange={(v) => updateCandidate("equityInterest", v)}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-frustration">
            What frustrates you most in traditional job platforms?
          </label>
          <textarea
            id="wl-frustration"
            rows={3}
            placeholder="Tell us your biggest pain point…"
            required
            value={candidateData.frustration}
            onChange={(e) => updateCandidate("frustration", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-email">Email</label>
          <input
            id="wl-email"
            type="email"
            placeholder="you@email.com"
            required
            value={candidateData.email}
            onChange={(e) => updateCandidate("email", e.target.value)}
          />
        </div>

        {status === "error" && <p className={styles.errorMsg}>{errorMsg}</p>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader size={18} className={styles.spinner} />
              Sending…
            </>
          ) : (
            <>
              <Send size={18} />
              Submit answers
            </>
          )}
        </button>
      </form>
    );
  }

  /* ---- Startup Form ---- */
  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="wl-startup-name">Startup Name</label>
          <input
            id="wl-startup-name"
            type="text"
            placeholder="Acme Corp"
            required
            value={startupData.companyName}
            onChange={(e) => updateStartup("companyName", e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="wl-stage">Current Stage</label>
          <CustomSelect
            id="wl-stage"
            placeholder="Select stage…"
            options={STAGE_OPTIONS}
            value={startupData.stage}
            onChange={(v) => updateStartup("stage", v)}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="wl-hours">
            Hours/week lost interviewing wrong-fit candidates?
          </label>
          <CustomSelect
            id="wl-hours"
            placeholder="Select range…"
            options={HOURS_OPTIONS}
            value={startupData.hoursLost}
            onChange={(v) => updateStartup("hoursLost", v)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="wl-offers-equity">
            Would you offer Equity to attract senior talent?
          </label>
          <CustomSelect
            id="wl-offers-equity"
            placeholder="Select…"
            options={OFFERS_EQUITY_OPTIONS}
            value={startupData.offersEquity}
            onChange={(v) => updateStartup("offersEquity", v)}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="wl-hard-skill">Hardest skill to find today?</label>
        <CustomSelect
          id="wl-hard-skill"
          placeholder="Select…"
          options={HARD_SKILL_OPTIONS}
          value={startupData.hardestSkill}
          onChange={(v) => updateStartup("hardestSkill", v)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="wl-startup-email">Email</label>
        <input
          id="wl-startup-email"
          type="email"
          placeholder="founder@startup.com"
          required
          value={startupData.email}
          onChange={(e) => updateStartup("email", e.target.value)}
        />
      </div>

      {status === "error" && <p className={styles.errorMsg}>{errorMsg}</p>}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader size={18} className={styles.spinner} />
            Sending…
          </>
        ) : (
          <>
            <Send size={18} />
            Submit answers
          </>
        )}
      </button>
    </form>
  );
}
