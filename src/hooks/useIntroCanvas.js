import { useEffect } from "react";
import { assetUrl } from "../utils/assetUrl";
import {
  coverRect,
  framePath,
  getMediaProgress,
  getMountedMediaElements,
  INTRO_ANCHOR_FRAMES,
  progressToFrame,
  progressToIntroSegment,
} from "../utils/introSequence";

const SEGMENT_COUNT = INTRO_ANCHOR_FRAMES.length - 1;
const VIDEO_SEGMENT_COUNT = 3;
const MAX_CACHE_SIZE = 24;

export function useIntroCanvas({
  canvasRef,
  videoRefs,
  sectionRef,
  reducedMotion,
  onSceneArrive,
}) {
  useEffect(() => {
    if (reducedMotion) return undefined;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const videos = getMountedMediaElements(videoRefs.current);
    if (!canvas || !section || videos.length !== VIDEO_SEGMENT_COUNT) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const decodedFrames = new Map();
    let animationFrameId = null;
    let disposed = false;
    let activeScene = -1;
    let requestedFrame = INTRO_ANCHOR_FRAMES[3];

    const sizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
    };

    const drawImage = (image) => {
      const rect = coverRect(
        image.naturalWidth,
        image.naturalHeight,
        canvas.width,
        canvas.height,
      );
      context.drawImage(
        image,
        rect.sx,
        rect.sy,
        rect.sw,
        rect.sh,
        rect.dx,
        rect.dy,
        rect.dw,
        rect.dh,
      );
    };

    const trimCache = () => {
      while (decodedFrames.size > MAX_CACHE_SIZE) {
        const firstFrame = decodedFrames.keys().next().value;
        decodedFrames.delete(firstFrame);
      }
    };

    const drawFrame = (frame) => {
      requestedFrame = frame;
      const cached = decodedFrames.get(frame);
      if (cached) {
        drawImage(cached);
        return;
      }

      const image = new Image();
      image.src = assetUrl(framePath(frame));
      image.decode().then(() => {
        if (disposed) return;
        decodedFrames.set(frame, image);
        trimCache();
        if (requestedFrame === frame) drawImage(image);
      }).catch(() => {});
    };

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
      const scrollableHeight = rect.height - window.innerHeight;
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, -rect.top / scrollableHeight))
        : 0;
      const { segmentIndex, localProgress, sceneIndex } = progressToIntroSegment(
        progress,
        SEGMENT_COUNT,
      );

      videos.forEach((video, index) => {
        const visible = segmentIndex === index;
        video.style.opacity = visible ? "1" : "0";
        seekVideo(video, getMediaProgress(segmentIndex, localProgress, index));
      });

      const canvasVisible = segmentIndex === VIDEO_SEGMENT_COUNT;
      canvas.style.opacity = canvasVisible ? "1" : "0";
      if (canvasVisible) {
        const fromFrame = INTRO_ANCHOR_FRAMES[3];
        const toFrame = INTRO_ANCHOR_FRAMES[4];
        drawFrame(fromFrame + progressToFrame(localProgress, toFrame - fromFrame + 1));
      }

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

    const handleResize = () => {
      sizeCanvas();
      requestRender();
    };

    videos.forEach((video) => {
      video.pause();
      video.addEventListener("loadedmetadata", requestRender);
    });
    sizeCanvas();
    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      videos.forEach((video) => video.removeEventListener("loadedmetadata", requestRender));
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
      decodedFrames.clear();
    };
  }, [canvasRef, onSceneArrive, reducedMotion, sectionRef, videoRefs]);
}
