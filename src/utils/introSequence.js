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
