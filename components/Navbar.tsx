"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  BookOpen,
  BarChart3,
  Database,
  Settings,
  HardDrive,
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
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
    { href: "/simulasi", label: "Simulasi Penuh", icon: Clock },
    { href: "/latihan", label: "Latihan Kategori", icon: BookOpen },
    { href: "/riwayat", label: "Riwayat", icon: Clock },
    { href: "/analisis", label: "Analisis", icon: BarChart3 },
    { href: "/bank-soal", label: "Bank Soal", icon: Database },
    { href: "/backup", label: "Backup", icon: HardDrive },
    { href: "/pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white shadow-sm">
            <span className="text-xs font-black tracking-wider">CAT</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold leading-none text-blue-900 dark:text-blue-400">
              SIMULASI SKD CPNS
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Local-First CAT BKN Engine</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right buttons: Active session pill + Theme toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {activeAttempt && (
            <Link
              href={`/ujian/${activeAttempt.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-500/30 hover:bg-amber-500/25 dark:bg-amber-400/10 dark:text-amber-300"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              Lanjutkan Ujian
            </Link>
          )}

          <button
            onClick={cycleTheme}
            title={`Tema: ${theme}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "light" && <Sun className="h-4 w-4" />}
            {theme === "dark" && <Moon className="h-4 w-4" />}
            {theme === "system" && <Laptop className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 xl:hidden dark:border-slate-700 dark:text-slate-200"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 xl:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
