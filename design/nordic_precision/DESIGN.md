---
name: Nordic Precision
colors:
  surface: '#121315'
  surface-dim: '#121315'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303032'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#121315'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
  cobalt-light: '#1D4ED8'
  cobalt-dark: '#3B82F6'
  emerald-light: '#059669'
  emerald-dark: '#10B981'
  amber-light: '#D97706'
  amber-dark: '#F59E0B'
  rose-light: '#E11D48'
  rose-dark: '#F43F5E'
  canvas-light: '#F8FAFC'
  canvas-dark: '#08090A'
  surface-dark: '#101216'
  surface-elevated-dark: '#181B20'
  border-dark: '#23272F'
  border-light: '#E2E8F0'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-timer:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  label-timer-mobile:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  label-metric:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-kbd:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system synthesizes Scandinavian utilitarian ergonomics with the speed, precision, and density of modern developer software. Designed specifically for high-stakes Computer Assisted Testing (CAT BKN / SKD CPNS), the interface prioritizes absolute cognitive clarity, frictionless keyboard-driven speed, and disciplined information hierarchy over decorative excess.

The emotional tone balances institutional trustworthiness with athletic focus. Candidates should feel calm, alert, and in total command of their testing environment. Visual clutter, ambiguous interactions, and heavy decorative illustrations are eliminated. Instead, visual rhythm is generated through crisp geometric alignments, surgical 1px hairline borders, deliberate micro-interactions, and tabular-monospaced telemetry.

## Colors

The system uses a strict dual-mode chromatic foundation tailored for intense, multi-hour testing sessions.

- **Obsidian Dark Mode (Default):** Anchored on `#08090A` for the base canvas, utilizing subtle elevation tiers (`#101216` and `#181B20`) separated by ultra-crisp hairline borders (`#23272F`). Accent cobalt shifts to `#3B82F6` for optimal luminous readability.
- **Slate 50 Light Mode:** Built on a clean `#F8FAFC` foundation with `#FFFFFF` cards, framed with low-contrast borders (`#E2E8F0`) and deepened cobalt (`#1D4ED8`).

### Semantic State System
Exam workflows map directly to functional status tokens:
- **Primary / Active Focus (`cobalt`):** Current question in viewport, active navigation controls, focused inputs.
- **Passing / Answered (`emerald`):** Verified selection, completed question status in the palette, qualifying passing scores (TKP/TIU/TWK).
- **Flagged / Review (`amber`):** Marked for later verification, warning flags, low remaining time.
- **Urgent / Incomplete (`rose`):** Unanswered items, countdown crisis (< 5 minutes), disqualified threshold markers.

## Typography

Typography drives the operational cadence of the test session. It employs a two-tier pairing:

1. **Inter:** Serves as the primary vehicle for high-legibility passage comprehension, statement evaluations, and system interface chrome. Letter tracking is slightly cinched at larger headline sizes for an editorial, disciplined feel.
2. **JetBrains Mono:** Dedicated to state telemetry, remaining time counters, question grid coordinates, and keyboard shortcut glyphs. All numeric time and score displays must enforce `font-variant-numeric: tabular-nums` to eliminate jitter as countdowns tick.

## Layout & Spacing

The simulator uses a fixed-fluid split workbench layout structured around three spatial zones:

- **Desktop (1024px+):** A 12-column asymmetric layout with a persistent top diagnostic header (56px fixed height), an 8-column main reading and question interaction canvas, and a 4-column right-anchored tactical control dock (housing the 110-item question matrix, live segment scores, and flag triggers).
- **Tablet (768px - 1023px):** A consolidated single-column view with the tactical matrix collapsing into an off-canvas slide-out drawer or pinned bottom sheet.
- **Mobile (< 768px):** A single vertical column prioritizing the immediate question prompt and quick `A`-`E` option stacks, with secondary diagnostics collapsed into an expansive sticky footer bar.

Spacing follows an 8px base rhythm with 4px half-steps reserved for tightly bound atomic units (keyboard hints, metric labels, badge containers).

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of Scandinavian surface layering and razor-sharp perimeter definition:

- **Surface Layering:** Depth is constructed primarily through subtle tonal contrast. Base canvas sits at the deepest value, working areas occupy elevated card containers, and focused options lift into interactive surface highlights.
- **Hairline Outlines:** All containers and interactive modules rely on a consistent 1px structural outline (`border-dark` or `border-light`) with zero blurry diffuse halos.
- **Ambient Floor Shadow:** When elevated cards or modal dialogs must detach from the plane, they use an ultra-diffused, ambient shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.4)` on dark canvas and `0 8px 24px -4px rgba(15, 23, 42, 0.06)` on light canvas.
- **Focus Rings:** Active questions and keyboard-focused targets receive an offset 2px ring using the active accent color (`#3B82F6`) with a 2px inward transparent separation.

## Shapes

The geometric architecture uses deliberate curvature contrast. Outer structural containers and exam passage cards use generous 20px–24px corners to produce a soft, architectural framing that reduces spatial fatigue during extended use. 

Internal controls, option pickers, and action buttons settle firmly into precise 12px–16px radii. Micro-elements—including question grid matrix cells, keyboard modifier badges, and status pills—use tight 6px–8px corners to retain structural density and tabular alignment.

## Components

### Buttons & Action Controls
- **Primary Actions (Next, Submit):** 44px height, 14px font size, 12px corner radius. Solid cobalt fill with high-contrast text. Subtle top highlight border (`rgba(255, 255, 255, 0.15)`) in dark mode.
- **Secondary Actions (Previous, Clear):** 44px height, subtle surface fill with 1px border. Hover shifts border color toward the primary hue.
- **Flag Button:** Outlined amber toggle that transitions to an amber fill with an amber glow badge when active.
- **Keyboard Badges:** Embedded inside action buttons using monospaced micro-badges (`[Enter]`, `[Space]`, `[F]`) rendered in low-opacity monochrome.

### Question Matrix Grid
- Dense 10x11 matrix for all 110 SKD questions (TWK, TIU, TKP).
- Grid cells are compact 36px x 36px squares with 8px radius and tabular numerals.
- **Default:** Muted surface with 1px neutral border.
- **Current:** Solid 2px cobalt ring with luminous surface.
- **Answered:** Solid emerald surface tint with emerald border and high-contrast numerical label.
- **Flagged:** Amber top-right diagonal marker dot or border accent.
- **Unanswered:** Dimmed opacity when flagged.

### Option Selectors (A, B, C, D, E)
- Full-width interactive horizontal cards with generous internal padding (16px 20px) and 16px corner radius.
- Leading letter indicator (`A`-`E`) set in a rounded square chip (28px) with monospace label.
- Selected state shifts the entire card border to 1.5px cobalt with a 5% cobalt background tint.
- Smooth transition on hover and active click states with zero layout shift.

### Exam Telemetry & Countdown Timer
- Fixed horizontal status bar.
- Remaining time displayed via tabular monospaced numbers. Transitions from neutral monochrome to static amber when remaining time is under 15 minutes, and pulsing rose under 5 minutes.
- Real-time progress segment bar displaying TWK, TIU, and TKP completion ratios with individual semantic pass/fail threshold markers.

### Input Fields & Keybinding Dialogs
- Text fields utilize 1px hairline borders, deepening on focus.
- Keyboard shortcuts modal renders with an obsidian frosted backdrop (`backdrop-filter: blur(12px)`) with crisp tabular list layouts.