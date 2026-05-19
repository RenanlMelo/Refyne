'use client';

import { useEffect, useState } from 'react';
import styles from './ThemePicker.module.scss';
import { Palette, Check } from 'lucide-react';

const themes = [
  { id: 'blue', label: 'Light Blue', light: '#10e4f3', dark: '#19b5c0' },
  { id: 'purple', label: 'Purple', light: '#9333ea', dark: '#7e22ce' },
  { id: 'orange', label: 'Strong Orange', light: '#ff5a1f', dark: '#d03801' },
  { id: 'green', label: 'Green', light: '#22c55e', dark: '#16a34a' },
];

export default function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('refyne-theme') || 'blue';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('refyne-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className={styles.themePickerContainer}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar Cores"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.header}>Personalizar Cores</div>
          <div className={styles.options}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`${styles.option} ${currentTheme === theme.id ? styles.active : ''}`}
                onClick={() => changeTheme(theme.id)}
              >
                <div 
                  className={styles.colorPreview} 
                  style={{ background: `linear-gradient(135deg, ${theme.light}, ${theme.dark})` }}
                >
                  {currentTheme === theme.id && <Check size={12} color="white" />}
                </div>
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
