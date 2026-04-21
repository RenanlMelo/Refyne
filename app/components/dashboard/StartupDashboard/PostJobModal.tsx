import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const SimpleMDEditor = dynamic(
  () => import("./SimpleMDEditor"),
  { ssr: false }
);
import styles from "./PostJobModal.module.scss";
import { useCreateJob } from "../../../hooks/useCreateJob";

export function PostJobModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { createJob, loading, error } = useCreateJob();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    employmentType: "FULL_TIME",
    workModel: "REMOTE",
    city: "",
    state: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    equityMin: "",
    equityMax: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description) {
      // Small alert for required description since MDEditor isn't a native required input
      alert("A descrição da vaga (Description) é obrigatória.");
      return;
    }

    const payload = {
      ...formData,
      status: "OPEN",
      salaryMin: Number(formData.salaryMin) || 0,
      salaryMax: Number(formData.salaryMax) || 0,
      equityMin: Number(formData.equityMin) || 0,
      equityMax: Number(formData.equityMax) || 0,
    };

    const success = await createJob(payload);
    if (success) {
      onSuccess();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Post a New Job</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.body}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Job Title <span style={{ color: "#ef4444" }}>*</span></label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Employment Type</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACTOR">Contractor</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Work Model <span style={{ color: "#ef4444" }}>*</span></label>
              <select name="workModel" value={formData.workModel} onChange={handleChange}>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ONSITE">On-site</option>
              </select>
            </div>
          </div>

          <div className={styles.threeCols}>
            <div className={styles.formGroup}>
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} placeholder="São Paulo" />
            </div>
            <div className={styles.formGroup}>
              <label>State</label>
              <input name="state" value={formData.state} onChange={handleChange} placeholder="SP" />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Brazil" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Minimum Salary (R$)</label>
              <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} placeholder="8000" />
            </div>
            <div className={styles.formGroup}>
              <label>Maximum Salary (R$)</label>
              <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} placeholder="12000" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Minimum Equity (%)</label>
              <input type="number" step="0.01" name="equityMin" value={formData.equityMin} onChange={handleChange} placeholder="0.1" />
            </div>
            <div className={styles.formGroup}>
              <label>Maximum Equity (%)</label>
              <input type="number" step="0.01" name="equityMax" value={formData.equityMax} onChange={handleChange} placeholder="0.5" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description <span style={{ color: "#ef4444" }}>*</span></label>
            <div data-color-mode="dark">
              <SimpleMDEditor
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val || "" })}
                placeholder="Describe the role, responsibilities, and impact..."
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Requirements</label>
            <div data-color-mode="dark">
              <SimpleMDEditor
                value={formData.requirements}
                onChange={(val) => setFormData({ ...formData, requirements: val || "" })}
                placeholder="List the technical skills, experience, and qualifications..."
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
