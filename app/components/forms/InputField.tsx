import React from "react";
import { LucideIcon } from "lucide-react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  label: string;
  icon?: LucideIcon;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
  row?: number;
  required?: boolean;
  format?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className = "",
  as = "input",
  children,
  row,
  required,
  format
}) => {
  const Component = as;

  const applyMask = (val: string, mask: string) => {
    let masked = "";
    let i = 0;
    let j = 0;

    const cleanValue = val.replace(/\D/g, "");

    while (i < mask.length && j < cleanValue.length) {
      if (mask[i] === "#") {
        masked += cleanValue[j];
        j++;
      } else {
        masked += mask[i];
        if (j < cleanValue.length && mask[i] === cleanValue[j]) {
          j++;
        }
      }
      i++;
    }
    return masked;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newVal = e.target.value;
    if (format) {
      newVal = applyMask(newVal, format);
    }
    onChange(newVal);
  };

  return (
    <div className={`${styles.inputFieldWrapper} ${className} ${required ? styles.required : ""}`}>
      <label className={styles.inputLabel}>
        {label}
        {required && <span className={styles.requiredAsterisk}>*</span>}
      </label>
      <div className={styles.inputRelative}>
        {Icon && <Icon className={styles.inputIcon} />}
        <Component
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${styles.inputControl} ${error ? styles.inputError : ""} ${!Icon ? styles.iconLessPadding : ""}`}
          required={required}
          style={{ paddingLeft: !Icon ? '1rem' : '2.5rem' }}
          {...(as === "input" ? { type } : {})}
          {...(as === "textarea" ? { rows: row } : {})}
        >
          {children}
        </Component>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
