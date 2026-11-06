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
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="notranslate" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 1. Isolate browser extension nodes from body root to prevent React 19 hydration mismatch
              (function() {
                try {
                  const relocateExtensionNodes = function() {
                    if (!document.body) return;
                    const badNodes = document.body.querySelectorAll('.translate-tooltip-mtz, .hidden_translate, [class*="translate-tooltip"]');
                    for (let i = 0; i < badNodes.length; i++) {
                      const el = badNodes[i];
                      if (el.parentNode === document.body) {
                        document.documentElement.appendChild(el);
                      }
                    }
                  };
                  relocateExtensionNodes();
                  if (typeof MutationObserver !== 'undefined') {
                    const obs = new MutationObserver(function(mutations) {
                      for (let i = 0; i < mutations.length; i++) {
                        const m = mutations[i];
                        for (let j = 0; j < m.addedNodes.length; j++) {
                          const n = m.addedNodes[j];
                          if (n.nodeType === 1 && (
                            n.classList?.contains('translate-tooltip-mtz') ||
                            n.classList?.contains('hidden_translate') ||
                            (n.className && typeof n.className === 'string' && n.className.indexOf('translate-tooltip') !== -1)
                          )) {
                            if (n.parentNode === document.body) {
                              document.documentElement.appendChild(n);
                            }
                          }
                        }
                      }
                    });
                    if (document.body) {
                      obs.observe(document.body, { childList: true });
                    } else {
                      document.addEventListener('DOMContentLoaded', function() {
                        obs.observe(document.body, { childList: true });
                      });
                    }
                    window.addEventListener('load', function() {
                      setTimeout(function() { obs.disconnect(); }, 3000);
                    });
                  }
                } catch (_) {}
              })();

              // 2. Instant Theme initialization (prevents flash of white/dark)
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
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-canvas-dark dark:text-slate-100 flex flex-col notranslate"
        suppressHydrationWarning
      >
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
