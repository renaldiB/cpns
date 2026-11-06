import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Simulasi CAT SKD CPNS — Aplikasi Web Pribadi",
  description: "Web simulasi tes SKD CPNS mandiri CAT BKN local-first dan offline-capable",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-canvas-dark dark:text-slate-100 flex flex-col"
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('cpns_theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-400">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
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
