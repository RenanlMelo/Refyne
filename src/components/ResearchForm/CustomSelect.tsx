"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./CustomSelect.module.scss";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CustomSelect({
  id,
  placeholder = "Select…",
  options,
  value,
  onChange,
  required,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  /* ---- Close on outside click ---- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---- Scroll focused item into view ---- */
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      const item = listRef.current?.children[focusedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, open]);

  const select = (option: Option) => {
    onChange(option.value);
    setOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(0);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0) select(options[focusedIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`${styles.container} ${open ? styles.isOpen : ""}`}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-required={required}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => setOpen((prev) => !prev)}
    >
      {/* Trigger */}
      <div className={`${styles.trigger} ${!value ? styles.placeholder : ""}`}>
        <span>{value ? selectedLabel : placeholder}</span>
        <ChevronDown size={16} className={styles.chevron} />
      </div>

      {/* Dropdown list */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={styles.list}
          aria-label={placeholder}
        >
          {options.map((option, idx) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`
                ${styles.option}
                ${option.value === value ? styles.selected : ""}
                ${idx === focusedIndex ? styles.focused : ""}
              `}
              onMouseDown={(e) => {
                e.preventDefault(); // prevents blur before click
                select(option);
              }}
              onMouseEnter={() => setFocusedIndex(idx)}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <Check size={14} className={styles.checkIcon} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
