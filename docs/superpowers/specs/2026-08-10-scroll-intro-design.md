# Scroll Intro Design

## Goal

Add a full-screen, five-scene scroll introduction before the existing personal landing page. The interaction should take its pacing from the supplied reference: each wheel or touch scroll advances a scene while the background subtly zooms and the left copy fades between scenes. After the fifth scene, normal page scrolling continues into the existing hero and landing page.

## Scope

- Keep the existing landing-page content, links, and components unchanged after the intro.
- Use only the repository's existing `hero-bridge.svg` as the intro background; do not copy reference-site imagery or assets.
- Make scene copy easy to change in source code, with no visitor-facing editor or persistence layer.
- Support mouse wheel, keyboard scrolling, touch scrolling, and a reduced-motion fallback.

## Architecture

### Scene data

Add `src/constants/introScenes.js`, exporting an ordered five-item array. Each item has:

```js
{ label, title, description }
```

This is the sole content-editing surface. Changing any field updates the preview through Vite hot reload.

### Intro component

Add `src/components/ScrollIntro.jsx` before `Hero` in `App.jsx`.

The component creates a sticky, viewport-height visual stage inside a scroll container with five viewport-height steps. The active step is determined with `IntersectionObserver`. It renders:

- left-aligned scene number, label, title, and description;
- the existing bridge illustration as a fixed visual background;
- a right-side five-dot progress indicator on desktop;
- a clear `aria-live` label for the currently active scene.

The component must not trap scrolling. When its final scene scrolls out, the browser naturally reaches the existing hero. Scrolling upward returns through the scenes.

### Motion and accessibility

- Scene changes use CSS opacity and transform transitions.
- The background scales modestly by active scene to create depth without a new image asset.
- Respect `prefers-reduced-motion`: disable transitions and background scaling while preserving the scene sequence.
- On small screens, remove the side progress dots and keep left copy within readable padding.

## Styling

Extend `css/styles.css` with a small, namespaced `scroll-intro__*` block. The intro uses the existing DM Sans base font, black text, white/soft-gray surface, and the repository's bridge artwork. The left content must remain legible with a white-to-transparent overlay over the illustration.

## Files

- `src/constants/introScenes.js` — editable five-scene copy.
- `src/components/ScrollIntro.jsx` — scene rendering and active-scene state.
- `src/App.jsx` — mount the intro before `Hero`.
- `css/styles.css` — responsive intro layout and motion rules.

## Verification

1. Run `npm run build` successfully.
2. In a desktop browser, scroll through all five scenes, confirm the dot state and copy change, then confirm the existing hero follows scene five.
3. Check that changing a value in `introScenes.js` updates the displayed preview.
4. Test a narrow mobile viewport: readable copy, no horizontal overflow, and no obstructive progress dots.
5. Enable reduced motion and confirm scene content remains accessible without animated transforms.

## Non-goals

- No CMS, browser editor, saved visitor changes, new routes, or new image generation.
- No changes to the current landing-page sections after the hero.
