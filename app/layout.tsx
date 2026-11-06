import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Simulasi CAT SKD CPNS — Aplikasi Web Pribadi",
  description: "Web simulasi tes SKD CPNS mandiri CAT BKN local-first dan offline-capable",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 1. Isolate browser extension nodes (e.g. Mouse Tooltip Translator) from React hydration
              (function() {
                var deferredNodes = [];
                var isHydrated = false;

                var isExtensionNode = function(node) {
                  if (!node || node.nodeType !== 1) return false;
                  var cls = node.className;
                  if (typeof cls === 'string' && (
                    cls.indexOf('translate-tooltip') !== -1 ||
                    cls.indexOf('hidden_translate') !== -1 ||
                    cls.indexOf('sm-root') !== -1 ||
                    cls.indexOf('mtz') !== -1
                  )) return true;
                  if (node.tagName === 'AUDIO' && cls && typeof cls === 'string' && cls.indexOf('audio-for-speech') !== -1) return true;
                  return false;
                };

                var origInsertBefore = Node.prototype.insertBefore;
                var origAppendChild = Node.prototype.appendChild;
                var origPrepend = Element.prototype.prepend;

                Node.prototype.insertBefore = function(newChild, refChild) {
                  if (!isHydrated && isExtensionNode(newChild)) {
                    deferredNodes.push(newChild);
                    return newChild;
                  }
                  return origInsertBefore.call(this, newChild, refChild);
                };

                Node.prototype.appendChild = function(newChild) {
                  if (!isHydrated && isExtensionNode(newChild)) {
                    deferredNodes.push(newChild);
                    return newChild;
                  }
                  return origAppendChild.call(this, newChild);
                };

                if (origPrepend) {
                  Element.prototype.prepend = function() {
                    if (!isHydrated) {
                      var filtered = [];
                      for (var i = 0; i < arguments.length; i++) {
                        var arg = arguments[i];
                        if (isExtensionNode(arg)) {
                          deferredNodes.push(arg);
                        } else {
                          filtered.push(arg);
                        }
                      }
                      return origPrepend.apply(this, filtered);
                    }
                    return origPrepend.apply(this, arguments);
                  };
                }

                var detachExisting = function() {
                  if (!document.body) return;
                  var badNodes = document.body.querySelectorAll('.translate-tooltip-mtz, .hidden_translate, [class*="translate-tooltip"], [class*="mtz"]');
                  for (var i = 0; i < badNodes.length; i++) {
                    var el = badNodes[i];
                    if (el.parentNode) {
                      el.parentNode.removeChild(el);
                      deferredNodes.push(el);
                    }
                  }
                };

                var flushDeferred = function() {
                  if (isHydrated) return;
                  isHydrated = true;
                  Node.prototype.insertBefore = origInsertBefore;
                  Node.prototype.appendChild = origAppendChild;
                  if (origPrepend) Element.prototype.prepend = origPrepend;

                  for (var i = 0; i < deferredNodes.length; i++) {
                    try {
                      if (document.body && !document.body.contains(deferredNodes[i])) {
                        origAppendChild.call(document.body, deferredNodes[i]);
                      }
                    } catch (_) {}
                  }
                  deferredNodes.length = 0;
                };

                if (typeof document !== 'undefined') {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', detachExisting, { once: true });
                  } else {
                    detachExisting();
                  }
                }

                if (typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    setTimeout(flushDeferred, 300);
                  });
                  setTimeout(flushDeferred, 1000);
                }

                // 2. Instant Theme initialization (prevents flash of white/dark)
                try {
                  var t = localStorage.getItem('cpns_theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
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
            <p suppressHydrationWarning>
              Simulasi CAT SKD CPNS &copy; 2026 — Local-First Single-User App.
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
