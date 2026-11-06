"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  BookOpen,
  Layers,
  BarChart3,
  Database,
  Settings,
  HardDrive,
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [activeAttempt, setActiveAttempt] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem("cpns_theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }

    // Check active attempt
    fetch("/api/attempts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.activeAttempt) {
          setActiveAttempt(data.activeAttempt);
        }
      })
      .catch(() => {});
  }, []);

  const applyTheme = (t: "light" | "dark" | "system") => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else if (t === "light") {
      root.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const cycleTheme = () => {
    const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    localStorage.setItem("cpns_theme", next);
    applyTheme(next);
  };

  // If in the middle of an exam screen, hide the main navbar to prevent distraction
  if (pathname.startsWith("/ujian/")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Beranda", icon: FileText },
    { href: "/simulasi", label: "Simulasi CAT", icon: Clock },
    { href: "/latihan", label: "Latihan Drill", icon: BookOpen },
    { href: "/batch-soal", label: "Batch Soal", icon: Layers },
    { href: "/riwayat", label: "Riwayat", icon: Clock },
    { href: "/analisis", label: "Analisis", icon: BarChart3 },
    { href: "/bank-soal", label: "Bank Soal", icon: Database },
    { href: "/backup", label: "Backup", icon: HardDrive },
    { href: "/pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <header className="sticky top-2 z-50 w-full px-3 sm:px-6 flex justify-center pointer-events-none mb-3">
      <div className="pointer-events-auto w-full max-w-[1536px] bg-white/90 dark:bg-surface-elevated-dark/90 backdrop-blur-md border border-border-light dark:border-border-dark rounded-full px-3.5 sm:px-5 py-2 shadow-lg shadow-black/5 dark:shadow-black/40 flex items-center justify-between gap-3 transition-colors">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cobalt-light dark:bg-cobalt-dark text-white font-mono font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
            CAT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold leading-none tracking-tight text-slate-900 dark:text-white">
              CAT BKN
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-outline uppercase leading-tight mt-0.5">
              Official Simulator
            </span>
          </div>
          <span className="hidden 2xl:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-surface-container-high border border-border-light dark:border-border-dark text-[10px] font-mono text-cobalt-light dark:text-primary font-semibold tracking-wider ml-1">
            SKD 2024/2026
          </span>
        </Link>

        {/* Center Pill Nav Links */}
        <nav className="hidden xl:flex items-center bg-slate-100/80 dark:bg-surface-dark border border-slate-200/80 dark:border-border-dark p-1 rounded-full gap-0.5 shrink-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-cobalt-light dark:bg-cobalt-dark text-white shadow-sm"
                    : "text-slate-600 dark:text-on-surface-variant hover:text-slate-900 dark:hover:text-on-surface hover:bg-white/60 dark:hover:bg-surface-container-high"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Online Status + Active Session + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Realtime Live Engine Status */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark">
            <span className="w-2 h-2 rounded-full bg-emerald-light dark:bg-emerald-dark animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-700 dark:text-secondary-fixed-dim font-medium whitespace-nowrap">
              Lokal Online
            </span>
          </div>

          {activeAttempt && (
            <Link
              href={`/ujian/${activeAttempt.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-500/30 hover:bg-amber-500/25 dark:bg-amber-400/10 dark:text-amber-300"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              Lanjutkan Ujian
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={cycleTheme}
            title={`Ganti Tema (Saat ini: ${theme})`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-container-high transition-colors"
          >
            {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
            {theme === "dark" && <Moon className="h-4 w-4 text-cobalt-dark" />}
            {theme === "system" && <Laptop className="h-4 w-4" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 xl:hidden dark:border-border-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {isOpen && (
        <div className="pointer-events-auto absolute top-16 left-3 right-3 sm:left-6 sm:right-6 max-w-[1536px] mx-auto rounded-2xl border border-border-light dark:border-border-dark bg-white/95 dark:bg-surface-elevated-dark/95 backdrop-blur-md p-3 shadow-2xl xl:hidden z-50">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cobalt-light dark:bg-cobalt-dark text-white"
                      : "text-slate-700 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-container-high"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
