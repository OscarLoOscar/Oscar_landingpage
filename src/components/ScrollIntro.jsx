import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_SCENES, INTRO_TRANSITIONS } from "../constants/introScenes";
import { useIntroCanvas } from "../hooks/useIntroCanvas";
import { assetUrl } from "../utils/assetUrl";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const canvasRef = useRef(null);
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);
  const activeScene = INTRO_SCENES[activeIndex];
  const handleSceneArrive = useCallback((scene) => {
    setActiveIndex(scene);
  }, []);
  useIntroCanvas({
    canvasRef,
    videoRefs,
    sectionRef,
    reducedMotion,
    onSceneArrive: handleSceneArrive,
  });

  const skipToHero = () => {
    document.getElementById("top")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const selectReducedMotionScene = (event, index) => {
    if (!reducedMotion) return;

    event.preventDefault();
    setActiveIndex(index);
    window.history.replaceState(null, "", `#intro-scene-${index + 1}`);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section
      className="scroll-intro"
      aria-label="Portfolio introduction"
      ref={sectionRef}
    >
      <div className="scroll-intro__stage" data-active-index={activeIndex}>
        <picture className="scroll-intro__visual" aria-hidden="true">
          <img
            src={assetUrl(activeScene.image)}
            alt=""
            loading={activeIndex === 0 ? "eager" : "lazy"}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
          />
        </picture>
        {!reducedMotion && (
          <>
            <div className="scroll-intro__videos" aria-hidden="true">
              {INTRO_TRANSITIONS.map((src, index) => (
                <video
                  key={src}
                  className="scroll-intro__video"
                  ref={(node) => { videoRefs.current[index] = node; }}
                  muted
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                >
                  <source src={assetUrl(src)} type="video/mp4" />
                </video>
              ))}
            </div>
            <canvas
              className="scroll-intro__canvas"
              ref={canvasRef}
              aria-hidden="true"
            />
          </>
        )}
        <div className="scroll-intro__copy">
          <p className="scroll-intro__label">{activeScene.label}</p>
          <h1 className="scroll-intro__title">{activeScene.title}</h1>
          <p className="scroll-intro__description">{activeScene.description}</p>
          <div className="scroll-intro__actions">
            <a className="scroll-intro__button scroll-intro__button--primary" href="#projects">
              View my work
            </a>
            <a className="scroll-intro__button" href="#course-contact">
              Contact me
            </a>
            <button className="scroll-intro__skip" type="button" onClick={skipToHero}>
              Skip intro
            </button>
          </div>
          <p className="scroll-intro__live" aria-live="polite">
            {activeScene.title}
          </p>
        </div>
        <nav className="scroll-intro__progress" aria-label="Introduction scenes">
          {INTRO_SCENES.map((scene, index) => (
            <a
              key={scene.label}
              className="scroll-intro__progress-button"
              href={`#intro-scene-${index + 1}`}
              aria-current={activeIndex === index ? "step" : undefined}
              aria-label={`Go to ${scene.label}`}
              onClick={(event) => selectReducedMotionScene(event, index)}
            >
              <span className="scroll-intro__progress-dot" aria-hidden="true" />
              <span className="scroll-intro__progress-label">{scene.label.split(" · ")[1]}</span>
            </a>
          ))}
        </nav>
        <p className="scroll-intro__mobile-progress" aria-live="polite">
          {activeIndex + 1} / {INTRO_SCENES.length}
        </p>
      </div>

      {INTRO_SCENES.map((scene, index) => (
        <article
          key={scene.label}
          className="scroll-intro__step"
          data-index={index}
          id={`intro-scene-${index + 1}`}
          aria-label={`${scene.label}: ${scene.title}`}
        >
          <div className="scroll-intro__step-copy">
            <p>{scene.label}</p>
            <h2>{scene.title}</h2>
            <p>{scene.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
