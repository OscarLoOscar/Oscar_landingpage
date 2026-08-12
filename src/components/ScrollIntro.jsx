import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_SCENES } from "../constants/introScenes";
import { useIntroCanvas } from "../hooks/useIntroCanvas";
import { assetUrl } from "../utils/assetUrl";
import { frameToScene } from "../utils/introSequence";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const activeScene = INTRO_SCENES[activeIndex];
  const handleFrameChange = useCallback((frame) => {
    setActiveIndex(frameToScene(frame));
  }, []);

  useIntroCanvas({
    canvasRef,
    sectionRef,
    reducedMotion,
    onFrameChange: handleFrameChange,
  });

  const skipToHero = () => {
    document.getElementById("top")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextIndex = Number(entry.target.dataset.index);
            setActiveIndex(nextIndex);
          }
        }),
      { threshold: 0.6 },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));

    return () => observer.disconnect();
  }, [reducedMotion]);

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
          <canvas
            className="scroll-intro__canvas"
            ref={canvasRef}
            aria-hidden="true"
          />
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
          ref={(step) => {
            stepRefs.current[index] = step;
          }}
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
