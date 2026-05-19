import { X } from "lucide-react";
import styles from "./SkillSelect.module.scss";

interface SkillTagProps {
  label: string;
  onRemove: () => void;
}

export function SkillTag({ label, onRemove }: SkillTagProps) {
  return (
    <div className={styles.skillTag}>
      <span>{label}</span>
      <button type="button" onClick={onRemove} className={styles.removeBtn}>
        <X size={14} />
      </button>
    </div>
  );
}
