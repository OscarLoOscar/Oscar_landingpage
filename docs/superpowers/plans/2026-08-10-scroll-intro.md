# Scroll Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a five-scene, scroll-driven introduction whose editable source copy appears before the existing landing page.

**Architecture:** `introScenes.js` owns all display copy. `ScrollIntro` renders the five scroll steps, observes the active scene, and exposes only presentational state to CSS. `App` mounts it before the unchanged `Hero`; CSS creates the sticky stage, transition states, responsive layout, and reduced-motion behavior.

**Tech Stack:** React 19, Vite 6, CSS, browser-native `IntersectionObserver`.

## Global Constraints

- Use `assets/images/hero-bridge.svg`; do not copy reference-site imagery or assets.
- Make `label`, `title`, and `description` the only scene-copy editing surface.
- Keep all existing landing-page content, links, and components unchanged after the intro.
- Do not add dependencies, a visitor-facing editor, persistence, routes, or generated image assets.
- Preserve keyboard, touch, mouse-wheel, narrow-screen, and `prefers-reduced-motion` access.

---

### Task 1: Define editable scene copy

**Files:**
- Create: `src/constants/introScenes.js`

**Interfaces:**
- Produces: `INTRO_SCENES`, an ordered array of exactly five objects with string properties `label`, `title`, and `description`.
- Consumed by: `src/components/ScrollIntro.jsx`.

- [ ] **Step 1: Create the scene configuration**

```js
export const INTRO_SCENES = [
  { label: "01 / 05 · THE CITY", title: "BUILD THE FOUNDATION", description: "From enterprise systems to practical tools, every project starts with a solid base." },
  { label: "02 / 05 · THE GRIND", title: "SOLVE THE HARD PARTS", description: "Turn complex requirements into clear, maintainable software." },
  { label: "03 / 05 · THE HUSTLE", title: "SHIP REAL WORK", description: "Build products that move from an idea into everyday use." },
  { label: "04 / 05 · THE HOME", title: "KEEP LEARNING", description: "Make room for new tools, stronger workflows, and better decisions." },
  { label: "05 / 05 · YOUR ROOM", title: "MAKE IT YOURS", description: "Scroll on to explore the work, experience, and teaching behind the portfolio." },
];
```

- [ ] **Step 2: Check configuration shape manually**

Run: `node -e "import('./src/constants/introScenes.js').then(({INTRO_SCENES}) => { if (INTRO_SCENES.length !== 5 || INTRO_SCENES.some(({label,title,description}) => !label || !title || !description)) process.exit(1); console.log('five editable scenes') })"`

Expected: `five editable scenes`.

- [ ] **Step 3: Commit the configuration**

```bash
git add src/constants/introScenes.js
git commit -m "feat: add editable intro scene copy"
```

### Task 2: Render the scroll introduction

**Files:**
- Create: `src/components/ScrollIntro.jsx`
- Modify: `src/App.jsx:1-12`

**Interfaces:**
- Consumes: `INTRO_SCENES` from `../constants/introScenes`.
- Produces: `<ScrollIntro />`, rendered before `<Hero />`.

- [ ] **Step 1: Implement the component with active-scene observation**

```jsx
import { useEffect, useRef, useState } from "react";
import { INTRO_SCENES } from "../constants/introScenes";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveIndex(Number(entry.target.dataset.index));
      }),
      { threshold: 0.6 }
    );
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <section className="scroll-intro" aria-label="Portfolio introduction">{/* steps and stage */}</section>;
}
```

Render one `article.scroll-intro__step` per scene with `data-index`, a ref, and its copy. Render a sticky `scroll-intro__stage` using the active scene. Add an `aria-live="polite"` element containing `INTRO_SCENES[activeIndex].title`. Render the desktop progress buttons as anchors linking to `#intro-scene-${index + 1}`, with an `aria-current` value only for the active scene.

- [ ] **Step 2: Mount the component without changing page order after the hero**

```jsx
import ScrollIntro from "./components/ScrollIntro";

export default function App() {
  return (
    <>
      <ScrollIntro />
      <Hero />
      {/* existing main and footer remain unchanged */}
    </>
  );
}
```

- [ ] **Step 3: Build and inspect the rendered tree**

Run: `npm run build`

Expected: Vite completes without errors.

Run the dev server and inspect the browser DOM.

Expected: exactly five `.scroll-intro__step` elements exist before `.hero`, and each progress control targets its corresponding step id.

- [ ] **Step 4: Commit the component integration**

```bash
git add src/components/ScrollIntro.jsx src/App.jsx
git commit -m "feat: add scroll-driven portfolio intro"
```

### Task 3: Add responsive and reduced-motion styling

**Files:**
- Modify: `css/styles.css` after the existing hero rules

**Interfaces:**
- Consumes: `scroll-intro__*` classes from `ScrollIntro` and its active-state modifier.
- Produces: sticky visual staging, legible left copy, desktop progress dots, mobile adaptation, and motion-safe fallback.

- [ ] **Step 1: Add the core styles**

```css
.scroll-intro { position: relative; height: 500vh; }
.scroll-intro__stage { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.scroll-intro__visual { background: url("../assets/images/hero-bridge.svg") center / cover; transition: transform 560ms ease, filter 560ms ease; }
.scroll-intro__copy { position: absolute; inset: auto auto 16vh clamp(1.25rem, 5vw, 5rem); max-width: 34rem; }
.scroll-intro__step { min-height: 100vh; scroll-margin-top: 0; }
```

Use opacity and `translateY` for inactive and active copy. Apply the background scale from a `data-active-index` attribute on the stage instead of per-scene inline styles. Use a left white gradient overlay to maintain contrast over the SVG.

- [ ] **Step 2: Add responsive and motion fallbacks**

```css
@media (max-width: 700px) {
  .scroll-intro__progress { display: none; }
  .scroll-intro__copy { right: 1.25rem; bottom: 12vh; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-intro *, .scroll-intro *::before, .scroll-intro *::after { transition: none !important; }
  .scroll-intro__visual { transform: none !important; }
}
```

- [ ] **Step 3: Verify visible behavior**

Run: `npm run build`

Expected: successful build.

In a desktop browser, scroll through all five scenes and back up. Confirm title/copy, active progress state, background zoom, and uninterrupted transition into the existing Hero. At a 390px wide viewport, confirm there is no horizontal overflow and progress dots are hidden. With reduced motion enabled, confirm every scene remains readable and changes without animation.

- [ ] **Step 4: Commit the styling**

```bash
git add css/styles.css
git commit -m "style: animate and adapt scroll intro"
```

### Task 4: Final regression and design QA

**Files:**
- Create: `design-qa.md`

**Interfaces:**
- Consumes: the source reference capture and the browser-rendered local implementation capture.
- Produces: a Product Design QA report with final result `passed` only when no P0, P1, or P2 visual issues remain.

- [ ] **Step 1: Verify editable preview copy**

Temporarily change the first `title` in `src/constants/introScenes.js` to `PREVIEW CHECK`, inspect the running page, then restore the configured title before committing.

Expected: the first intro scene displays `PREVIEW CHECK` after hot reload; no visitor-facing editing control exists.

- [ ] **Step 2: Capture and compare**

Capture the source opening and local opening at matching desktop viewport dimensions. Put both captures into one comparison image. Check fonts and typography, spacing and layout rhythm, colors and tokens, image quality and asset fidelity, copy and content, and the active scroll state.

- [ ] **Step 3: Record and resolve blockers**

Write `design-qa.md` with source path, local screenshot path, viewport, pixel sizes, state, comparison evidence, primary interactions tested, console errors checked, findings, and `final result: passed` or `final result: blocked`.

If a P0/P1/P2 issue exists, fix it in the owned source file, repeat the matching capture, append the issue/fix/evidence history, and keep `final result: blocked` until a later comparison finds no actionable P0/P1/P2 issue.

- [ ] **Step 4: Commit the QA report**

```bash
git add design-qa.md
git commit -m "docs: verify scroll intro design"
```

## Self-Review

- Spec coverage: Tasks 1-3 cover editable copy, five scroll scenes, preserved landing page, existing SVG-only imagery, desktop/mobile behavior, and reduced motion. Task 4 covers build, preview editability, browser interaction, and Product Design QA.
- Placeholder scan: complete; every task has concrete commands, code, and file paths.
- Interface consistency: `INTRO_SCENES`, `ScrollIntro`, `scroll-intro__*`, and `data-active-index` use the same names in all tasks.
