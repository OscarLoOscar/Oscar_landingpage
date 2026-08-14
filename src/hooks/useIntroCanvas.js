import { useEffect } from "react";
import {
  getMediaProgress,
  getMountedMediaElements,
  getSectionScrollFraction,
  progressToIntroSegment,
} from "../utils/introSequence";

const SCENE_COUNT = 5;
const VIDEO_SEGMENT_COUNT = 5;

export function useIntroCanvas({
  videoRefs,
  sectionRef,
  reducedMotion,
  onSceneArrive,
}) {
  useEffect(() => {
    const section = sectionRef.current;
    const videos = getMountedMediaElements(videoRefs.current);
    if (!section || videos.length !== VIDEO_SEGMENT_COUNT) return undefined;

    let animationFrameId = null;
    let activeScene = -1;

    const seekVideo = (video, localProgress) => {
      if (!Number.isFinite(video.duration)) return;
      const targetTime = Math.min(
        Math.max(0, video.duration - 0.04),
        localProgress * video.duration,
      );
      if (Math.abs(video.currentTime - targetTime) > 0.008) {
        video.currentTime = targetTime;
      }
    };

    const render = () => {
      animationFrameId = null;
      const rect = section.getBoundingClientRect();
      const progress = getSectionScrollFraction(rect, window.innerHeight);
      section.dataset.scrollFraction = progress.toFixed(4);
      const { segmentIndex, localProgress, sceneIndex } = progressToIntroSegment(
        progress,
        VIDEO_SEGMENT_COUNT,
        SCENE_COUNT,
      );

      videos.forEach((video, index) => {
        const visible = segmentIndex === index;
        video.style.opacity = visible ? "1" : "0";
        seekVideo(video, getMediaProgress(segmentIndex, localProgress, index));
      });

      if (sceneIndex !== activeScene) {
        activeScene = sceneIndex;
        onSceneArrive(activeScene);
      }
    };

    const requestRender = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    videos.forEach((video) => {
      video.pause();
      video.addEventListener("loadedmetadata", requestRender);
    });
    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      videos.forEach((video) => video.removeEventListener("loadedmetadata", requestRender));
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    };
  }, [onSceneArrive, reducedMotion, sectionRef, videoRefs]);
}
