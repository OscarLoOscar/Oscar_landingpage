import { useEffect } from "react";
import { assetUrl } from "../utils/assetUrl";
import {
  coverRect,
  framePath,
  frameToScrollOffset,
  INTRO_FRAME_COUNT,
  progressToFrame,
} from "../utils/introSequence";

const MAX_CACHE_SIZE = 24;

export function useIntroCanvas({
  canvasRef,
  sectionRef,
  reducedMotion,
  onFrameChange,
}) {
  useEffect(() => {
    if (reducedMotion) return undefined;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const decodedFrames = new Map();
    const inFlightFrames = new Map();
    let animationFrameId = null;
    let disposed = false;
    let requestedFrame = 0;
    let notifiedFrame = -1;
    let lastDrawnImage = null;
    let introWasActive = false;

    const trimCache = () => {
      while (decodedFrames.size > MAX_CACHE_SIZE) {
        let farthestFrame = null;
        let farthestDistance = -1;

        decodedFrames.forEach((_, frame) => {
          const distance = Math.abs(frame - requestedFrame);
          if (distance > farthestDistance) {
            farthestFrame = frame;
            farthestDistance = distance;
          }
        });

        decodedFrames.delete(farthestFrame);
      }
    };

    const loadFrame = (frame) => {
      if (decodedFrames.has(frame)) {
        return Promise.resolve(decodedFrames.get(frame));
      }
      if (inFlightFrames.has(frame)) return inFlightFrames.get(frame);

      const image = new Image();
      image.src = assetUrl(framePath(frame));
      const promise = image
        .decode()
        .then(() => {
          if (!disposed) {
            decodedFrames.set(frame, image);
            trimCache();
          }
          return image;
        })
        .finally(() => {
          inFlightFrames.delete(frame);
        });

      inFlightFrames.set(frame, promise);
      return promise;
    };

    const sizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(bounds.width * pixelRatio);
      const height = Math.round(bounds.height * pixelRatio);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
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
      lastDrawnImage = image;
    };

    const requestDraw = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        sizeCanvas();

        const viewportTop = 0;
        const sectionRect = section.getBoundingClientRect();
        const scrollableHeight = sectionRect.height - window.innerHeight;
        introWasActive =
          sectionRect.top <= viewportTop &&
          sectionRect.bottom >= window.innerHeight;
        const progress = scrollableHeight > 0
          ? (viewportTop - sectionRect.top) / scrollableHeight
          : 0;
        requestedFrame = progressToFrame(progress, INTRO_FRAME_COUNT);

        if (requestedFrame !== notifiedFrame) {
          notifiedFrame = requestedFrame;
          onFrameChange(requestedFrame);
        }

        const requestedImage = decodedFrames.get(requestedFrame);
        if (requestedImage) {
          drawImage(requestedImage);
        } else if (lastDrawnImage) {
          drawImage(lastDrawnImage);
        }

        if (!requestedImage) {
          loadFrame(requestedFrame)
            .then(() => {
              if (!disposed) requestDraw();
            })
            .catch(() => {});
        }

        for (let offset = 1; offset <= 8; offset += 1) {
          const frame = requestedFrame + offset;
          if (frame < INTRO_FRAME_COUNT) loadFrame(frame).catch(() => {});
        }
        for (let offset = 1; offset <= 3; offset += 1) {
          const frame = requestedFrame - offset;
          if (frame >= 0) loadFrame(frame).catch(() => {});
        }
      });
    };

    const handleResize = () => {
      if (introWasActive && notifiedFrame >= 0) {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top + window.scrollY;
        const scrollableHeight = sectionRect.height - window.innerHeight;
        const targetScroll = sectionTop + frameToScrollOffset(
          requestedFrame,
          scrollableHeight,
        );
        const previousScrollBehavior =
          document.documentElement.style.scrollBehavior;

        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, targetScroll);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      }

      requestDraw();
    };

    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", handleResize);
    requestDraw();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      decodedFrames.clear();
      inFlightFrames.clear();
    };
  }, [canvasRef, sectionRef, reducedMotion, onFrameChange]);
}
