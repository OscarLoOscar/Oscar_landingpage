# Cafe → Room Motion Transition Design

## Goal

Replace only the first intro transition with a reversible, scroll-scrubbable motion-graphics MP4 based on the approved line-art keyframes. Keep the current intro player and copy unchanged.

## Approved Visual Direction

- 16:9, 1920×1080, 30 fps, 4.0 seconds, silent H.264 MP4.
- Warm-white canvas with generous left-side negative space.
- Black and charcoal line art with sparse pale-gray shading.
- Electric teal and coral-pink are the only vivid accent colors.
- Five approved anchors at 0%, 25%, 50%, 75%, and 100%.

## Motion Sequence

1. **0–25% — Draw and pulse:** hold the Cafe composition, animate the teal cursor pulse, draw the coffee steam, and begin moving small Cafe objects outward.
2. **25–50% — Camera handoff:** push the camera along the steam line, simplify the Cafe objects, and transform the steam into a cable.
3. **50–75% — Room construction:** merge the tabletops, unfold the Room monitor, lamp, chair, and shelf from matching line geometry, and connect the cable to the desk.
4. **75–100% — Room resolve:** fade the remaining Cafe ghost lines, settle the Room composition, and reveal the coral bedding as the final accent.

Each phase uses deterministic easing and continuous transforms so every frame remains valid when scrubbed forward or backward.

## Implementation

- Build one project-local HTML/SVG composition for this transition.
- Reuse the five approved raster anchors as visual guides and background plates.
- Use native CSS/SVG animation for camera transforms, stroke drawing, opacity, and accent pulses; add no animation dependency.
- Render the composition to frames in a browser, then encode them with FFmpeg into `assets/videos/intro/cafe-room-v2.mp4`.
- Preview the new MP4 locally before changing `INTRO_TRANSITIONS`.
- After approval, replace only the first transition path; retain the remaining four current MP4s.

## Scroll Behaviour

The current player remains unchanged. Section scroll progress maps to `video.currentTime`, so downward scrolling seeks forward and upward scrolling naturally seeks backward. No separate reversed video is needed.

## Failure and Accessibility Behaviour

- Keep the existing Cafe and Room still images as visual fallbacks while video metadata loads.
- Preserve the existing reduced-motion behaviour and navigation controls.
- Encode without audio and with browser-compatible pixel format `yuv420p`.

## Verification

- Confirm the MP4 is 1920×1080, 30 fps, 4.0 seconds, silent, H.264, and `yuv420p` using `ffprobe`.
- Check exact visual continuity at the five approved anchor positions.
- Run the existing intro tests and production build.
- Verify locally that downward scroll plays forward, upward scroll reverses, leaving the intro stops changing the video, and the browser console stays clean.
- Do not commit, push, or deploy the source/video integration until the local preview is approved.

## Out of Scope

- The other three scene-to-scene transitions and the existing City ending clip.
- Redesigning the intro copy, layout, navigation, scroll mapping, or reduced-motion UX.
- Adding a new animation framework or video runtime.
