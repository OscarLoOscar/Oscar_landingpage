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

export function framePath(frame) {
  return `assets/images/intro-sequence/frames/frame-${String(frame).padStart(3, "0")}.webp`;
}

export function coverRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = targetWidth / targetHeight;

  if (sourceRatio > targetRatio) {
    const sw = Math.round(sourceHeight * targetRatio);
    return {
      sx: Math.round((sourceWidth - sw) / 2),
      sy: 0,
      sw,
      sh: sourceHeight,
      dx: 0,
      dy: 0,
      dw: targetWidth,
      dh: targetHeight,
    };
  }

  const sh = Math.round(sourceWidth / targetRatio);
  return {
    sx: 0,
    sy: Math.round((sourceHeight - sh) / 2),
    sw: sourceWidth,
    sh,
    dx: 0,
    dy: 0,
    dw: targetWidth,
    dh: targetHeight,
  };
}
