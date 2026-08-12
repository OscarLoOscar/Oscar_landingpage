# Canvas Frame Scrollytelling Design

## Goal

Replace the current five-image intro transition with a continuous, scroll-scrubbed Canvas journey. The visual story moves from a night-time Hong Kong cafe through a bedroom, office, public estate, and finally a city sunrise. Scrolling down plays the journey forward; scrolling up reverses the same frames.

## Approved Story

The ordered anchors and existing English copy are:

1. `scene-05-cafe.avif` — night — **SHIP REAL WORK**
2. `scene-04-room.avif` — late night — **MAKE IT YOURS**
3. `scene-03-office.avif` — before dawn — **SOLVE THE HARD PARTS**
4. `scene-02-estate.avif` — morning light — **KEEP LEARNING**
5. `scene-01-city.avif` — sunrise — **Backend Engineer · AI Educator**

The time and colour progression is continuous: deep blue and warm practical lights in the cafe gradually give way to golden sunrise light in the city.

## Visual Transitions

- **Cafe to Room:** Push toward a reflective drink or window. The cafe's warm highlights and window reflections transform into the bedroom window and interior lighting.
- **Room to Office:** Push into the laptop's dark screen. Passing through it reveals the office workspace.
- **Office to Estate:** Move through the office glass wall. Its architectural grid transforms into the estate facade and windows.
- **Estate to City:** Rise and pull back from the estate until it expands into the full Hong Kong city view at sunrise.
- **City exit:** Settle into a short, slow pull-back before normal scrolling continues into the existing portfolio.

AI-generated transition keyframes may introduce small changes to brick details. Each supplied source image remains an exact anchor frame at its scene boundary.

## Frame Production

- Target approximately 180 ordered frames across the complete journey.
- Generate a limited set of transition keyframes between each pair of source anchors, then interpolate motion between those keyframes.
- Preserve all five supplied AVIF files as exact anchor frames.
- Export web-delivery frames as sequentially named WebP assets, with desktop and smaller mobile variants when the measured payload justifies both sets.
- Produce a contact sheet or low-frame-rate preview before wiring the final sequence into the page so transition continuity can be reviewed.
- Generated transition artwork must remain generic brick-diorama imagery with no brand logos or readable generated text.

## Interaction Architecture

`ScrollIntro` retains a sticky viewport-height stage inside a tall scroll container. Its visual layer changes from a single `<picture>` to a responsive `<canvas>`.

On scroll:

1. Measure normalized progress through the intro container.
2. Map progress to an integer frame index from zero to the final frame.
3. Schedule drawing with `requestAnimationFrame` and draw the requested decoded image with cover-style cropping.
4. Derive the active scene from explicit anchor-frame boundaries.
5. Keep the existing foreground copy mounted and crossfade it only after progress crosses the next anchor boundary.

The frame mapping is direction-independent. Increasing scroll progress plays forward; decreasing progress draws earlier frames and therefore reverses the journey naturally.

The current one-scene wheel lock must not fight continuous scrubbing. Desktop wheel and trackpad input should follow continuous document progress within the intro, while leaving the page normally after either boundary. Touch scrolling, keyboard scrolling, progress links, and Skip Intro remain supported.

## Copy and Controls

- Foreground copy stays fixed and readable while background frames move.
- During a transition, the previous scene's copy remains visible.
- Copy crossfades only when the following anchor boundary is reached; the same rule reverses when scrolling upward.
- Preserve the existing descriptions, primary CTA, contact CTA, Skip Intro control, progress display, and live-region behavior.
- Update labels and image-to-copy mappings to match the approved Cafe-to-City order.

## Loading and Performance

- Draw the first anchor immediately and prioritize enough early frames to start scrolling without a blank canvas.
- Load nearby frames ahead of the current position instead of blocking first paint on all approximately 180 assets.
- Keep a bounded decoded-image cache and reuse in-flight requests.
- Canvas backing resolution accounts for device pixel ratio but uses a conservative cap to avoid excessive memory use.
- Missing or undecoded frames temporarily retain the most recently rendered frame; the page must never flash a blank canvas.
- Keep the five anchor images available as a non-Canvas fallback.
- Choose final dimensions, quality, and desktop/mobile variants using measured build size and browser performance rather than an assumed quality setting.

## Accessibility and Fallbacks

- With `prefers-reduced-motion: reduce`, do not scrub the generated sequence. Use the five static anchor images and discrete scene changes.
- The canvas is decorative and hidden from assistive technology; scene copy remains semantic HTML.
- Preserve keyboard-accessible controls and visible focus styles.
- If Canvas or frame loading fails, show the relevant static anchor rather than blocking access to the portfolio.

## Files in Scope

- Generated frame assets under `assets/images/intro-sequence/`.
- `src/components/ScrollIntro.jsx` for Canvas rendering, progress mapping, fallbacks, and copy boundaries.
- `src/constants/introScenes.js` for the approved order, existing copy, anchor images, and frame boundaries.
- `src/utils/introSequence.js` for pure frame/progress and scene-boundary calculations.
- `css/styles.css` for the Canvas layer and responsive presentation.
- Focused tests for progress-to-frame and progress-to-scene mapping.

Do not refactor unrelated landing-page components or change portfolio content after the intro.

## Verification

1. Validate the generated frame count, sequential filenames, dimensions, decodability, and anchor-frame placement.
2. Review a preview/contact sheet for Cafe to Room to Office to Estate to City continuity and night-to-sunrise progression.
3. Run unit tests for forward, reverse, boundary, and clamp behavior.
4. Run the existing test suite and production build.
5. In a real desktop browser, scrub slowly and quickly in both directions; confirm no blank frames, copy changes only at anchors, and the page exits both ends normally.
6. Test trackpad, mouse wheel, keyboard, narrow mobile viewport, touch behavior, resized viewport, and reduced motion.
7. Check console and network failures, initial loading experience, total generated payload, and decoded-memory behavior.
8. After deployment is explicitly authorized, verify the published HTML, bundle, frame assets, and live browser behavior on GitHub Pages.

## Non-goals

- No 3D engine or real-time generative rendering.
- No visitor-facing editor, CMS, routes, or changes to portfolio sections after the intro.
- No claim that interpolation alone creates new object motion; AI-generated keyframes provide the approved morphing and camera-travel content.
- No deployment or push without explicit user approval.
