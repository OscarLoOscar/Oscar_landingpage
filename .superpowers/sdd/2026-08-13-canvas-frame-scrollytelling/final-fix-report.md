# Final review fix report

## Status and commit

Both Important final-review findings are fixed in commit `d8cf42d` (`fix: pause intro canvas and restore reduced navigation`). No deployment or push was performed.

## Changes

### Reduced-motion scene controls

- Added a progress-link click path that runs only when `prefers-reduced-motion: reduce` is active.
- The handler prevents the hidden step anchor from scrolling, updates `activeIndex`, and replaces the URL hash without moving the viewport.
- Updating `activeIndex` changes the static picture, label, title, description, mobile progress, `aria-current`, and polite live region from the existing centralized `INTRO_SCENES` data.
- Normal-motion clicks return before `preventDefault()`, preserving native anchor scrolling.
- Removed the reduced-motion `IntersectionObserver` and step refs because CSS intentionally hides those steps and they cannot drive selection.
- The controls remain semantic anchors and respond to native keyboard Enter activation.

### Offscreen Canvas work

- Added `isIntroVisible(sectionRect, viewportHeight)` with strict viewport-overlap boundaries.
- `useIntroCanvas` now checks visibility before Canvas sizing, frame notification, drawing, frame loading, and neighbor preloading.
- A section with `bottom <= 0` or `top >= viewportHeight` performs none of that work.
- Scroll and resize listeners remain responsible for entry/re-entry. On the first visible callback, the hook recomputes the current clamped frame and draws/loads that boundary frame.
- Existing active-intro resize preservation remains intact. No observer or additional production listener/global was added; existing listeners, animation frame, and caches are cleaned up by the hook cleanup.

## TDD evidence

The pure visibility regression was added first and run against the old implementation:

```text
node --test test/introSequence.test.js
5 passed, 1 failed
TypeError: sequence.isIntroVisible is not a function
```

After the minimum implementation:

```text
node --test test/introSequence.test.js
6 passed, 0 failed
```

The test covers both completely-offscreen boundaries and one-pixel overlap on both viewport edges. A missing or non-strict visibility gate makes this test fail.

## Automated verification

Final test run:

```text
npm test
8 passed, 0 failed
```

Production build:

```text
npm run build
vite v6.4.3
47 modules transformed
docs/index.html                   1.04 kB | gzip 0.56 kB
docs/assets/index-BC5FwfMw.css  27.71 kB | gzip 6.58 kB
docs/assets/index-BvEGWeLk.js  254.13 kB | gzip 77.42 kB
exit 0
```

`git diff --check` and the staged equivalent both exited 0.

Vite's `emptyOutDir` removed/changed tracked and pre-existing untracked `docs` output during verification. Tracked `docs` files were restored with `git restore docs`. The pre-build untracked `index-BlJDIJ8L.js` was reproduced from an isolated `git archive HEAD` baseline build and restored; the new `index-BvEGWeLk.js` was moved to temporary storage. Final `docs` status exactly matches the pre-build status, and no generated `docs` file was staged or committed.

## Real-browser evidence

QA used isolated headless Chrome 150 through its native DevTools websocket against the current-source Vite dev server at `http://127.0.0.1:5173/Oscar_landingpage/`. The Canvas `drawImage` wrapper and draw array were injected only with `Page.addScriptToEvaluateOnNewDocument`; no debug global exists in production source.

### Reduced motion, native keyboard Enter

Chrome emulated `prefers-reduced-motion: reduce` at 1280 x 720. Each link was focused and activated with native CDP Enter key-down/key-up events.

| Control | Current | Title/live region | Static image | Hash | Scroll Y | Focus retained |
| ---: | ---: | --- | --- | --- | ---: | --- |
| 1 | 1 | `SHIP REAL WORK` | `scene-05-cafe.avif` | `#intro-scene-1` | 0 | yes |
| 2 | 2 | `MAKE IT YOURS` | `scene-04-room-night.webp` | `#intro-scene-2` | 0 | yes |
| 3 | 3 | `SOLVE THE HARD PARTS` | `scene-03-office.avif` | `#intro-scene-3` | 0 | yes |
| 4 | 4 | `KEEP LEARNING` | `scene-02-estate.avif` | `#intro-scene-4` | 0 | yes |
| 5 | 5 | `Backend Engineer · AI Educator` | `scene-01-city.avif` | `#intro-scene-5` | 0 | yes |

For every activation, exactly the matching link had `aria-current="step"`; the visible title and polite live region matched. `scrollY` staying at 0 confirms the reduced-motion handler changed selection/hash without native scrolling.

### Normal motion and Canvas inactivity

- Initial entry drew `frame-000.webp`; initial resource inventory was frames 000 through 008 (9 requests).
- Smooth travel below the intro loaded frames while the intro was visible. Once the section was completely above the viewport (`top=-3800`, `bottom=-200`), the stable baseline was 41 Canvas draws and 166 frame resources.
- Further offscreen scroll plus a synthetic resize left the counts at exactly 41 draws and 166 frame resources (`top=-4100`, `bottom=-500`). This confirms no offscreen draw or new preload.
- Re-entry at the final boundary increased the draw count and ended on `frame-180.webp`, `data-active-index="4"`, and `Backend Engineer · AI Educator`.
- Resizing from 1280 x 720 to 1280 x 760 kept the last Canvas image at `frame-180.webp`, active index 4, and the same title while adjusting the scroll offset.
- In normal motion, activating progress link 3 produced native `#intro-scene-3` navigation and scrolled its target to the viewport boundary, confirming the handler did not prevent default behavior.

## Self-review

- Scope: only `src/components/ScrollIntro.jsx`, `src/hooks/useIntroCanvas.js`, `src/utils/introSequence.js`, and `test/introSequence.test.js` changed in the fix commit. `css/styles.css` required no change.
- Simplicity: one reduced-mode handler and one pure overlap helper; no new abstraction, observer, dependency, production instrumentation, or global state.
- Cleanup: removing the ineffective reduced-motion observer also removes its observer lifecycle and unused step refs. The Canvas hook retains cleanup for scroll/resize listeners, the queued animation frame, decoded frames, and in-flight bookkeeping.
- Normal behavior: normal progress links retain native anchor semantics; reduced links retain focus and Enter behavior.
- Mutation check: changing either offscreen comparison from strict to inclusive, deleting the helper, or removing the hook guard breaks the visibility regression/browser counts. Removing the reduced branch or state update breaks all five browser state assertions.

## Concerns

- An image request already started while the intro is visible cannot be canceled by `HTMLImageElement.decode()`. Once the intro is offscreen, its completion can schedule the guarded animation callback, but that callback returns before sizing, drawing, loading, or preloading. Browser resource and draw counts remained stable throughout the offscreen interval.
- The browser QA script is a temporary external artifact at `/Users/oscarlo/Documents/Codex/2026-08-13/new-chat/work/intro-browser-qa.mjs`; it is not part of the repository or commit.
