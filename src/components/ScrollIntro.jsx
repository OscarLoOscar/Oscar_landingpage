import { useEffect, useRef, useState } from "react";
import { INTRO_SCENES } from "../constants/introScenes";
import { assetUrl } from "../utils/assetUrl";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const touchStartY = useRef(null);
  const activeScene = INTRO_SCENES[activeIndex];

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
    if (reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        }),
      { threshold: 0.6 },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));

    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < 1) return;
      event.preventDefault();
      skipToHero();
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [reducedMotion]);

  return (
    <section
      className="scroll-intro"
      aria-label="Portfolio introduction"
      ref={sectionRef}
      onTouchStart={(event) => {
        touchStartY.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        if (touchStartY.current - event.changedTouches[0].clientY > 24) skipToHero();
        touchStartY.current = null;
      }}
    >
      <div className="scroll-intro__stage" data-active-index={activeIndex}>
        <picture className="scroll-intro__visual" aria-hidden="true">
          <source srcSet={assetUrl(activeScene.image.replace(/\.png$/, ".avif"))} type="image/avif" />
          <img
            src={assetUrl(activeScene.image)}
            alt=""
            loading={activeIndex === 0 ? "eager" : "lazy"}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
          />
        </picture>
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
