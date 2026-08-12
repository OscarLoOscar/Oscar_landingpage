# Canvas Frame Scrollytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reversible, scroll-scrubbed 181-frame Canvas journey from Cafe at night through Room, Office, Estate, and City at sunrise while preserving the existing English copy and controls.

**Architecture:** Five supplied AVIF images remain exact anchor frames at indices `0, 45, 90, 135, 180`. Eight AI-generated bridge keyframes and a reproducible FFmpeg script create sequential WebP frames; a small pure utility maps scroll progress to frame and scene, while `ScrollIntro` owns loading, caching, Canvas drawing, and the static reduced-motion fallback.

**Tech Stack:** React 19, Vite 6, browser Canvas 2D and `requestAnimationFrame`, Node test runner, FFmpeg, WebP assets, image generation.

## Global Constraints

- Approved order: `scene-05-cafe.avif` → `scene-04-room.avif` → `scene-03-office.avif` → `scene-02-estate.avif` → `scene-01-city.avif`.
- Approved time progression: Cafe night → Room late night → Office before dawn → Estate morning light → City sunrise.
- Preserve the supplied files as exact anchor frames and preserve their existing English titles, descriptions, CTAs, Skip Intro, progress display, and live-region behavior.
- During each transition the previous scene's copy stays visible; crossfade only at anchor indices `45`, `90`, `135`, and `180`. Apply the same boundaries in reverse.
- Generated imagery stays a generic brick diorama with no logos or readable generated text. Small brick-detail changes are allowed only in bridge keyframes.
- Downward scrolling increases the frame index; upward scrolling decreases it. Do not use the existing wheel lock for continuous scrubbing.
- Reduced motion uses the five static anchor images with discrete scene changes and no Canvas scrubbing.
- Do not change unrelated landing-page sections, deploy, push, or delete user-owned source assets.

---

### Task 1: Define scene order and pure sequence mapping

**Files:**
- Create: `src/utils/introSequence.js`
- Create: `test/introSequence.test.js`
- Modify: `src/constants/introScenes.js`

**Interfaces:**
- Produces: `INTRO_FRAME_COUNT = 181`, `INTRO_ANCHOR_FRAMES = [0, 45, 90, 135, 180]`.
- Produces: `progressToFrame(progress, frameCount): number` and `frameToScene(frame, anchorFrames): number`.
- Produces: five `INTRO_SCENES` items with `label`, `title`, `description`, `image`, and `anchorFrame`.

- [ ] **Step 1: Write failing mapping tests**

```js
import assert from "node:assert/strict";
import test from "node:test";

const sequence = await import("../src/utils/introSequence.js").catch(() => ({}));

test("progress maps to a clamped frame", () => {
  assert.equal(sequence.progressToFrame(-1, 181), 0);
  assert.equal(sequence.progressToFrame(0, 181), 0);
  assert.equal(sequence.progressToFrame(0.25, 181), 45);
  assert.equal(sequence.progressToFrame(0.5, 181), 90);
  assert.equal(sequence.progressToFrame(1, 181), 180);
  assert.equal(sequence.progressToFrame(2, 181), 180);
});

test("scene changes only when an anchor is reached", () => {
  const anchors = [0, 45, 90, 135, 180];
  assert.equal(sequence.frameToScene(0, anchors), 0);
  assert.equal(sequence.frameToScene(44, anchors), 0);
  assert.equal(sequence.frameToScene(45, anchors), 1);
  assert.equal(sequence.frameToScene(134, anchors), 2);
  assert.equal(sequence.frameToScene(135, anchors), 3);
  assert.equal(sequence.frameToScene(179, anchors), 3);
  assert.equal(sequence.frameToScene(180, anchors), 4);
});
```

- [ ] **Step 2: Run the tests and confirm the new module is missing**

Run: `node --test test/introSequence.test.js`

Expected: FAIL because `progressToFrame` and `frameToScene` are not functions.

- [ ] **Step 3: Implement the pure mapping utility**

```js
export const INTRO_FRAME_COUNT = 181;
export const INTRO_ANCHOR_FRAMES = Object.freeze([0, 45, 90, 135, 180]);

export function progressToFrame(progress, frameCount = INTRO_FRAME_COUNT) {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(clamped * (frameCount - 1));
}

export function frameToScene(frame, anchorFrames = INTRO_ANCHOR_FRAMES) {
  const clampedFrame = Math.max(0, frame);
  let scene = 0;
  for (let index = 1; index < anchorFrames.length; index += 1) {
    if (clampedFrame < anchorFrames[index]) break;
    scene = index;
  }
  return scene;
}
```

- [ ] **Step 4: Replace the scene configuration with the approved mapping**

```js
export const INTRO_SCENES = [
  { label: "01 / 05 · THE HUSTLE", title: "SHIP REAL WORK", description: "Build products that move from an idea into everyday use.", image: "assets/images/intro-scenes/scene-05-cafe.avif", anchorFrame: 0 },
  { label: "02 / 05 · YOUR ROOM", title: "MAKE IT YOURS", description: "Scroll on to explore the work, experience, and teaching behind the portfolio.", image: "assets/images/intro-scenes/scene-04-room.avif", anchorFrame: 45 },
  { label: "03 / 05 · THE GRIND", title: "SOLVE THE HARD PARTS", description: "Turn complex requirements into clear, maintainable software.", image: "assets/images/intro-scenes/scene-03-office.avif", anchorFrame: 90 },
  { label: "04 / 05 · THE HOME", title: "KEEP LEARNING", description: "Make room for new tools, stronger workflows, and better decisions.", image: "assets/images/intro-scenes/scene-02-estate.avif", anchorFrame: 135 },
  { label: "05 / 05 · THE CITY", title: "Backend Engineer · AI Educator", description: "From enterprise systems to practical tools, I build solid foundations and teach people how to use modern tools with confidence.", image: "assets/images/intro-scenes/scene-01-city.avif", anchorFrame: 180 },
];
```

- [ ] **Step 5: Run mapping and configuration checks**

Run: `npm test`

Expected: all tests pass, including exact boundary cases.

- [ ] **Step 6: Commit the independently testable mapping**

```bash
git add src/utils/introSequence.js test/introSequence.test.js src/constants/introScenes.js
git commit -m "feat: define intro sequence mapping"
```

---

### Task 2: Generate and approve eight bridge keyframes

**Files:**
- Create: `assets/images/intro-sequence/keyframes/cafe-room-01.webp`
- Create: `assets/images/intro-sequence/keyframes/cafe-room-02.webp`
- Create: `assets/images/intro-sequence/keyframes/room-office-01.webp`
- Create: `assets/images/intro-sequence/keyframes/room-office-02.webp`
- Create: `assets/images/intro-sequence/keyframes/office-estate-01.webp`
- Create: `assets/images/intro-sequence/keyframes/office-estate-02.webp`
- Create: `assets/images/intro-sequence/keyframes/estate-city-01.webp`
- Create: `assets/images/intro-sequence/keyframes/estate-city-02.webp`
- Create: `assets/images/intro-sequence/keyframes/contact-sheet.webp`

**Interfaces:**
- Consumes: the two supplied anchor AVIF files named in each transition.
- Produces: two square, 512×512 bridge keyframes per transition, ordered `01` then `02`.

- [ ] **Step 1: Generate Cafe → Room bridge 01**

Use both `scene-05-cafe.avif` and `scene-04-room.avif` as references with this exact intent:

```text
Create a square cinematic intermediate frame in the same highly detailed generic brick-diorama style. Camera has pushed from the night cafe toward the foreground milk-tea glass and rain-streaked window. The circular glass reflection begins to reveal the late-night bedroom window and blue wall geometry, but the cafe table and warm pendant lights remain recognizable. Continuous camera travel, deep blue night outside, warm amber practical lights, physically plausible brick construction, no logos, no readable text.
```

- [ ] **Step 2: Generate Cafe → Room bridge 02**

```text
Create the later square intermediate frame of the same continuous push-through transition. The bedroom now dominates: desk, laptop, blue chair, bed and window are recognizable. Residual cafe reflections and warm pendant-light circles dissolve naturally across the bedroom window and desk surfaces. Late-night blue-and-amber lighting, same generic brick-diorama material, no logos, no readable text.
```

- [ ] **Step 3: Generate Room → Office bridges**

Generate `room-office-01.webp`:

```text
Square cinematic brick-diorama intermediate. Camera pushes directly toward the bedroom laptop; its dark screen expands and starts revealing rows of office desks, monitors and glass meeting-room lines. Bedroom desk edges and lamp remain around the screen. Time is before dawn, shifting from warm late-night room light toward cool blue office light. No logos or readable text.
```

Generate `room-office-02.webp`:

```text
Later frame of the same camera move through the laptop screen. The office now fills most of the image with central collaboration table, workers, plants and glass meeting room; only subtle bedroom desk and screen-bezel geometry remains at the edges. Cool pre-dawn city light with restrained warm interior lamps, generic brick diorama, no logos or readable text.
```

- [ ] **Step 4: Generate Office → Estate bridges**

Generate `office-estate-01.webp`:

```text
Square cinematic brick-diorama intermediate. Camera travels toward and through the office glass meeting wall. The black glass grid and office partitions begin transforming into repetitive residential windows and estate facade modules. Office workers and desks remain faintly recognizable in the foreground. Earliest morning blue light, no logos, no readable text.
```

Generate `office-estate-02.webp`:

```text
Later frame of the same move through glass into a Hong Kong public-estate courtyard. Residential towers, podium walkways, trees and basketball court dominate, while the last office glass-grid reflections dissolve into facade windows. Soft morning light begins warming the scene, generic brick diorama, no logos, no readable text.
```

- [ ] **Step 5: Generate Estate → City bridges**

Generate `estate-city-01.webp`:

```text
Square cinematic brick-diorama intermediate. Camera rises above the public-estate courtyard and pulls backward. Tower blocks and podium are still recognizable below while more Hong Kong hills and dense buildings emerge beyond them. Early golden morning light, coherent architecture, no logos, no readable text.
```

Generate `estate-city-02.webp`:

```text
Later aerial pull-back in the same continuous shot. The estate has become one part of a much wider Hong Kong skyline; harbour, ferries, hills and dense towers emerge, approaching the supplied city composition. Golden sunrise grows brighter at the horizon, generic brick diorama, no logos, no readable text.
```

- [ ] **Step 6: Normalize generated outputs and make a contact sheet**

Run one `ffmpeg` conversion per generated source so every named keyframe is exactly 512×512 WebP, quality 82. Then run:

```bash
ffmpeg -y \
  -i assets/images/intro-scenes/scene-05-cafe.avif \
  -i assets/images/intro-sequence/keyframes/cafe-room-01.webp \
  -i assets/images/intro-sequence/keyframes/cafe-room-02.webp \
  -i assets/images/intro-scenes/scene-04-room.avif \
  -i assets/images/intro-sequence/keyframes/room-office-01.webp \
  -i assets/images/intro-sequence/keyframes/room-office-02.webp \
  -i assets/images/intro-scenes/scene-03-office.avif \
  -i assets/images/intro-sequence/keyframes/office-estate-01.webp \
  -i assets/images/intro-sequence/keyframes/office-estate-02.webp \
  -i assets/images/intro-scenes/scene-02-estate.avif \
  -i assets/images/intro-sequence/keyframes/estate-city-01.webp \
  -i assets/images/intro-sequence/keyframes/estate-city-02.webp \
  -i assets/images/intro-scenes/scene-01-city.avif \
  -filter_complex "xstack=inputs=13:layout=0_0|512_0|1024_0|1536_0|0_512|512_512|1024_512|1536_512|0_1024|512_1024|1024_1024|1536_1024|0_1536:fill=white,scale=1024:-1" \
  -frames:v 1 assets/images/intro-sequence/keyframes/contact-sheet.webp
```

Expected: the sheet reads continuously from cafe night to city sunrise without a duplicated, reversed, or unrelated setting.

- [ ] **Step 7: Review gate before bulk frame rendering**

Open the contact sheet at original detail. Reject and regenerate any bridge that changes direction, loses the portal target, introduces non-brick objects, logos, readable text, or an abrupt time-of-day jump.

- [ ] **Step 8: Commit approved keyframes only**

```bash
git add assets/images/intro-sequence/keyframes
git commit -m "feat: add intro transition keyframes"
```

---

### Task 3: Build the reproducible 181-frame sequence

**Files:**
- Create: `scripts/build-intro-sequence.sh`
- Create: `assets/images/intro-sequence/frames/frame-000.webp` through `frame-180.webp`
- Create: `assets/images/intro-sequence/preview.mp4`

**Interfaces:**
- Consumes: five exact anchors plus eight approved bridge keyframes.
- Produces: 181 sequential 512×512 WebP files; anchors `000`, `045`, `090`, `135`, and `180` are lossless WebP encodes derived directly from the supplied AVIF anchors.

- [ ] **Step 1: Add a strict generation script**

The script must use `set -euo pipefail`, validate all 13 inputs, render each of four 45-index spans through its ordered `[anchor, bridge-01, bridge-02, next-anchor]` sources, and write into a temporary directory before replacing the output directory. Each span contains 46 endpoint-inclusive frames: anchor at local index 0, bridge 01 at 15, bridge 02 at 30, and next anchor at 45. Name frames with zero-padded indices and omit local index 0 from spans two through four so shared anchors are not duplicated. Encode the five anchors losslessly; encode non-anchor frames at measured lossy quality.

Use this invariant check at the end:

```bash
frame_count=$(find "$output_dir" -type f -name 'frame-*.webp' | wc -l | tr -d ' ')
test "$frame_count" = "181"
test -f "$output_dir/frame-000.webp"
test -f "$output_dir/frame-045.webp"
test -f "$output_dir/frame-090.webp"
test -f "$output_dir/frame-135.webp"
test -f "$output_dir/frame-180.webp"
```

For each anchor index, compare the decoded 512×512 anchor against a 512×512 decode of the emitted frame with FFmpeg `ssim`; require `All:1.000000` before accepting the build.

- [ ] **Step 2: Run the generator**

Run: `bash scripts/build-intro-sequence.sh`

Expected: exit 0, `181 frames generated`, and five exact-anchor checks pass.

- [ ] **Step 3: Validate every frame**

Run:

```bash
find assets/images/intro-sequence/frames -name 'frame-*.webp' -print0 | \
  xargs -0 -n 1 ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height -of csv=p=0
```

Expected: 181 lines of `512,512` and no decode errors.

- [ ] **Step 4: Create and visually inspect a scrub preview**

```bash
ffmpeg -y -framerate 30 \
  -i assets/images/intro-sequence/frames/frame-%03d.webp \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  assets/images/intro-sequence/preview.mp4
```

Inspect forward and reverse playback. If a bridge flickers or jumps, fix only that bridge keyframe or its corresponding script segment, rebuild, and repeat the invariant checks.

- [ ] **Step 5: Measure payload before deciding on mobile duplication**

Run: `du -sh assets/images/intro-sequence/frames`.

Acceptance: total frame payload is at most 24 MB. If it exceeds 24 MB, lower WebP quality in the script until it passes. Do not add a second mobile set unless real-browser mobile decoding fails during Task 6.

- [ ] **Step 6: Commit the generator and verified sequence**

```bash
git add scripts/build-intro-sequence.sh assets/images/intro-sequence/frames assets/images/intro-sequence/preview.mp4
git commit -m "feat: build intro frame sequence"
```

---

### Task 4: Implement Canvas frame loading and drawing

**Files:**
- Create: `src/hooks/useIntroCanvas.js`
- Modify: `src/components/ScrollIntro.jsx`
- Test: `test/introSequence.test.js`

**Interfaces:**
- Consumes: `progressToFrame`, `frameToScene`, `INTRO_FRAME_COUNT`, `INTRO_ANCHOR_FRAMES`, and `assetUrl`.
- Produces: `useIntroCanvas({ canvasRef, sectionRef, reducedMotion, onFrameChange })`.
- Produces: `<canvas className="scroll-intro__canvas" aria-hidden="true" />` plus a static `<picture>` fallback.

- [ ] **Step 1: Extend the test with frame path and cover-rectangle behavior**

Add pure exports to the expected interface:

```js
test("frame paths are zero padded", () => {
  assert.equal(sequence.framePath(0), "assets/images/intro-sequence/frames/frame-000.webp");
  assert.equal(sequence.framePath(180), "assets/images/intro-sequence/frames/frame-180.webp");
});

test("cover rectangle crops a square image into a wide canvas", () => {
  assert.deepEqual(sequence.coverRect(512, 512, 1200, 675), {
    sx: 0, sy: 112, sw: 512, sh: 288, dx: 0, dy: 0, dw: 1200, dh: 675,
  });
});
```

- [ ] **Step 2: Run the focused test and confirm missing functions**

Run: `node --test test/introSequence.test.js`

Expected: FAIL because `framePath` and `coverRect` are not functions.

- [ ] **Step 3: Implement the two pure helpers**

```js
export function framePath(frame) {
  return `assets/images/intro-sequence/frames/frame-${String(frame).padStart(3, "0")}.webp`;
}

export function coverRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = targetWidth / targetHeight;
  if (sourceRatio > targetRatio) {
    const sw = Math.round(sourceHeight * targetRatio);
    return { sx: Math.round((sourceWidth - sw) / 2), sy: 0, sw, sh: sourceHeight, dx: 0, dy: 0, dw: targetWidth, dh: targetHeight };
  }
  const sh = Math.round(sourceWidth / targetRatio);
  return { sx: 0, sy: Math.round((sourceHeight - sh) / 2), sw: sourceWidth, sh, dx: 0, dy: 0, dw: targetWidth, dh: targetHeight };
}
```

- [ ] **Step 4: Implement `useIntroCanvas` with bounded loading**

The hook must:

- compute progress as `(viewportTop - sectionRect.top) / (sectionRect.height - viewportHeight)` and clamp it through `progressToFrame`;
- draw only inside `requestAnimationFrame`;
- resolve frame URLs with `assetUrl(framePath(frame))`;
- load current frame first, then enqueue `+1` through `+8` and `-1` through `-3`;
- cap decoded cache entries at 24, evicting the farthest frame from the requested index;
- reuse an in-flight `Map<number, Promise<HTMLImageElement>>`;
- size the backing canvas to CSS pixels times `Math.min(devicePixelRatio, 2)`;
- retain the last successfully drawn frame if the requested image has not decoded;
- call `onFrameChange(frame)` only when the integer frame changes;
- remove scroll/resize listeners, cancel the pending animation frame, and clear maps on cleanup;
- do nothing when `reducedMotion` is true.

- [ ] **Step 5: Replace the visual layer and remove wheel locking**

In `ScrollIntro.jsx`:

- remove `getNextIntroIndex`, `wheelLockRef`, `wheelUnlockTimerRef`, and the non-passive `wheel` effect;
- derive `activeIndex` from `frameToScene(frame)` via the hook callback;
- keep `IntersectionObserver` only for the reduced-motion static fallback;
- render the active anchor `<picture>` beneath the Canvas so loading failure is never blank;
- render Canvas only when reduced motion is false;
- keep progress links targeting the five existing step article IDs;
- keep `skipToHero`, CTAs, labels, descriptions, and live-region markup.

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`

Expected: all tests pass and Vite completes without missing frame assets or import errors.

- [ ] **Step 7: Commit Canvas behavior**

```bash
git add src/hooks/useIntroCanvas.js src/components/ScrollIntro.jsx src/utils/introSequence.js test/introSequence.test.js
git commit -m "feat: scrub intro frames on canvas"
```

---

### Task 5: Style continuous scrubbing and reduced-motion fallback

**Files:**
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.scroll-intro__canvas`, `.scroll-intro__visual`, `.scroll-intro__copy`, and `data-active-index`.
- Produces: full-stage Canvas cover layout, readable fixed copy, and discrete static fallback.

- [ ] **Step 1: Add Canvas layer styles**

```css
.scroll-intro__canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.scroll-intro__visual {
  z-index: 0;
}

.scroll-intro__stage::after {
  z-index: 1;
}
```

Keep copy and controls at `z-index: 2`. Remove the five active-index scale rules because camera motion is embedded in the frame sequence.

- [ ] **Step 2: Make scene steps match exact anchor spacing**

Retain five viewport-height steps and the existing `500vh` container so each 25% progress boundary lands on the next anchor. Do not add CSS scroll snap or wheel interception.

- [ ] **Step 3: Preserve reduced motion explicitly**

Inside the existing reduced-motion media query, hide `.scroll-intro__canvas`, show `.scroll-intro__visual`, disable copy transitions, and retain the static first scene without extending the page to `500vh`.

- [ ] **Step 4: Verify styling mechanically**

Run: `npm test && npm run build`

Expected: pass; `docs/assets/` contains the built frame assets and the CSS contains `.scroll-intro__canvas`.

- [ ] **Step 5: Commit presentation changes**

```bash
git add css/styles.css
git commit -m "style: present canvas intro sequence"
```

---

### Task 6: Real-browser QA and final verification

**Files:**
- Modify only files from Tasks 1–5 if QA exposes an in-scope defect.

**Interfaces:**
- Consumes: the complete local production behavior.
- Produces: evidence that forward, reverse, fallback, loading, and page exit work.

- [ ] **Step 1: Run the full automated verification**

Run:

```bash
npm test
npm run build
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Start the local production preview**

Run: `npm run preview -- --host 127.0.0.1`

Expected: Vite reports a local URL under `/Oscar_landingpage/`.

- [ ] **Step 3: Verify desktop forward and reverse scrubbing in a real browser**

At 1440×900:

- record frame index and title at progress 0%, 25%, 50%, 75%, and 100%; expect `0/SHIP REAL WORK`, `45/MAKE IT YOURS`, `90/SOLVE THE HARD PARTS`, `135/KEEP LEARNING`, and `180/Backend Engineer · AI Educator`;
- scroll slowly and rapidly in both directions; confirm indices are monotonic in the direction of travel and no blank frame appears;
- confirm transition copy stays on the previous title until the next exact anchor;
- confirm scrolling beyond frame 180 enters the existing hero and scrolling upward re-enters at City;
- use Skip Intro and all progress links; confirm each reaches its intended destination;
- confirm console has no errors and failed frame requests equal zero.

- [ ] **Step 4: Verify viewport and accessibility behavior**

- Test 390×844 and 768×1024 viewports for cover cropping, readable copy, CTA access, and no horizontal overflow.
- Resize while midway through a transition; confirm Canvas redraws the same frame at the new size.
- Enable `prefers-reduced-motion: reduce`; confirm no Canvas scrub occurs, a static anchor remains visible, and portfolio navigation is available.
- Keyboard-tab through CTA, contact, Skip Intro, and progress controls; confirm visible focus and correct activation.

- [ ] **Step 5: Inspect performance evidence**

In the browser, confirm initial page rendering does not wait for all 181 frames, decoded cache stays at or below 24 images, Canvas DPR is capped at 2, and network requests advance around the current frame. Record total frame payload from Task 3.

- [ ] **Step 6: Fix only verified in-scope defects and rerun checks**

For each defect, add or tighten a pure test when the issue is mapping/loading logic, apply the smallest code change, then repeat Steps 1 and the affected browser checks. Do not refactor unrelated components.

- [ ] **Step 7: Commit QA fixes if any**

```bash
git add src/components/ScrollIntro.jsx src/hooks/useIntroCanvas.js src/utils/introSequence.js test/introSequence.test.js css/styles.css
git diff --cached --quiet || git commit -m "fix: harden intro sequence playback"
```

- [ ] **Step 8: Report completion without deploying**

Report automated results, browser scenarios checked, generated payload, known visual limitations, and the exact final scene mapping. Do not push or deploy until the user explicitly asks.
