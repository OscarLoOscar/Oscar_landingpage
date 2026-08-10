export function getNextIntroIndex(currentIndex, deltaY, sceneCount) {
  const direction = deltaY > 0 ? 1 : -1;
  return Math.min(sceneCount, Math.max(0, currentIndex + direction));
}
