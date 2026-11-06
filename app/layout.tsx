import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Simulasi CAT SKD CPNS — Aplikasi Web Pribadi",
  description: "Web simulasi tes SKD CPNS mandiri CAT BKN local-first dan offline-capable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              Simulasi CAT SKD CPNS &copy; {new Date().getFullYear()} — Local-First Single-User App.
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Profil Ujian Baseline: KepmenPANRB No. 321/2024 (Referensi Historis).
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
