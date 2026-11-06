"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeAttempt, setActiveAttempt] = useState<{ id: string } | null>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("cpns_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to light if preference not explicitly dark, or respect system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyTheme = (t: "light" | "dark") => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cpns_theme", next);
    applyTheme(next);
  };

  // If in the middle of an exam screen, hide the main navbar
  if (pathname.startsWith("/ujian/")) {
    return null;
  }

  // Primary links visible in the center pill
  const primaryLinks = [
    { href: "/", label: "Beranda", icon: FileText },
    { href: "/simulasi", label: "Simulasi CAT", icon: Clock },
    { href: "/latihan", label: "Latihan Drill", icon: BookOpen },
    { href: "/batch-soal", label: "Batch Soal", icon: Layers },
    { href: "/riwayat", label: "Riwayat", icon: Clock },
  ];

  // Secondary tools grouped into "Menu Lainnya" dropdown
  const secondaryLinks = [
    { href: "/analisis", label: "Analisis Kelemahan", icon: BarChart3 },
    { href: "/bank-soal", label: "Bank Soal Lokal", icon: Database },
    { href: "/backup", label: "Backup & Restore", icon: HardDrive },
    { href: "/pengaturan", label: "Pengaturan Sistem", icon: Settings },
  ];

  const allLinks = [...primaryLinks, ...secondaryLinks];
  const isSecondaryActive = secondaryLinks.some((link) => pathname === link.href);

  return (
    <header className="sticky top-2 z-50 w-full px-3 sm:px-6 flex justify-center pointer-events-none mb-3">
      <div className="pointer-events-auto w-full max-w-[1440px] bg-white/95 dark:bg-surface-elevated-dark/95 backdrop-blur-md border border-border-light dark:border-border-dark rounded-full px-3.5 sm:px-5 py-2 shadow-lg shadow-black/5 dark:shadow-black/40 flex items-center justify-between gap-3 transition-colors">
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
          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-surface-container-high border border-border-light dark:border-border-dark text-[10px] font-mono text-cobalt-light dark:text-primary font-semibold tracking-wider ml-1">
            SKD 2024/2026
          </span>
        </Link>

        {/* Center Pill Nav Links (Primary + More Dropdown) */}
        <nav className="hidden md:flex items-center bg-slate-100/90 dark:bg-surface-dark border border-slate-200/80 dark:border-border-dark p-1 rounded-full gap-0.5 shrink-0">
          {primaryLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-cobalt-light dark:bg-cobalt-dark text-white shadow-sm"
                    : "text-slate-600 dark:text-on-surface-variant hover:text-slate-900 dark:hover:text-on-surface hover:bg-white/70 dark:hover:bg-surface-container-high"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* More Menu Dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button
              type="button"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSecondaryActive
                  ? "bg-cobalt-light dark:bg-cobalt-dark text-white shadow-sm"
                  : "text-slate-600 dark:text-on-surface-variant hover:text-slate-900 dark:hover:text-on-surface hover:bg-white/70 dark:hover:bg-surface-container-high"
              }`}
            >
              <span>Alat & Menu</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-elevated-dark p-1.5 shadow-xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-100">
                {secondaryLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-cobalt-light dark:bg-cobalt-dark text-white"
                          : "text-slate-700 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-dark"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Theme Toggle + Online Badge + Active Attempt + Mobile Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Prominent Theme Toggle Button (Light / Dark) */}
          <button
            onClick={toggleTheme}
            type="button"
            title={`Beralih ke mode ${theme === "dark" ? "terang" : "gelap"}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-light bg-slate-100 hover:bg-slate-200 text-slate-800 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200 dark:hover:bg-surface-container-high transition-all text-xs font-bold shadow-sm active:scale-95 cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Mode Terang</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-cobalt-light" />
                <span className="hidden sm:inline">Mode Gelap</span>
              </>
            )}
          </button>

          {/* Realtime Live Engine Status */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark">
            <span className="w-2 h-2 rounded-full bg-emerald-light dark:bg-emerald-dark animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-700 dark:text-secondary-fixed-dim font-medium whitespace-nowrap">
              Lokal Online
            </span>
          </div>

          {/* Active Session Button */}
          {activeAttempt && (
            <Link
              href={`/ujian/${activeAttempt.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-500/30 hover:bg-amber-500/25 dark:bg-amber-400/10 dark:text-amber-300 transition-all shrink-0"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <span>Lanjutkan</span>
            </Link>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden dark:border-border-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {isOpen && (
        <div className="pointer-events-auto absolute top-16 left-3 right-3 sm:left-6 sm:right-6 max-w-[1440px] mx-auto rounded-3xl border border-border-light dark:border-border-dark bg-white/95 dark:bg-surface-elevated-dark/95 backdrop-blur-md p-3 shadow-2xl md:hidden z-50">
          <div className="flex flex-col gap-1">
            {allLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
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
