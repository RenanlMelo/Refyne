import { useState, useRef, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import { Skill, useSkillSearch } from "./useSkillSearch";
import { SkillTag } from "./SkillTag";
import styles from "./SkillSelect.module.scss";

interface SkillSelectProps {
  selectedSkills: Skill[];
  onSelectSkill: (skill: Skill) => void;
  onRemoveSkill: (id: number) => void;
  placeholder?: string;
}

export function SkillSelect({
  selectedSkills,
  onSelectSkill,
  onRemoveSkill,
  placeholder = "Search skills (e.g. React, Node.js)...",
}: SkillSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { results, loading } = useSkillSearch(inputValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (skill: Skill) => {
    onSelectSkill(skill);
    setInputValue("");
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className={styles.matchedText}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className={styles.skillSelectContainer} ref={containerRef}>
      <div className={styles.selectedSkillsList}>
        {selectedSkills.map((skill) => (
          <SkillTag
            key={skill.id}
            label={skill.nomeExibicao}
            onRemove={() => onRemoveSkill(skill.id)}
          />
        ))}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={placeholder}
        />
        {loading && (
          <div className={styles.loadingSpinner} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", padding: 0 }}>
            <Loader2 size={18} />
          </div>
        )}
      </div>

      {isDropdownOpen && inputValue.trim() !== "" && (
        <div className={styles.dropdown}>
          {loading ? (
            <div className={styles.loadingState}>Searching...</div>
          ) : results.length > 0 ? (
            results.map((skill, index) => (
              <div
                key={skill.id}
                className={`${styles.dropdownItem} ${index === highlightedIndex ? styles.highlighted : ""}`}
                onClick={() => handleSelect(skill)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span>{highlightMatch(skill.nomeExibicao, inputValue)}</span>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>No skills found matching "{inputValue}"</div>
          )}
        </div>
      )}
    </div>
  );
}
