import { useEffect, useRef, useState } from "react";
import { INTRO_SCENES } from "../constants/introScenes";
import { assetUrl } from "../utils/assetUrl";
import { getNextIntroIndex } from "../utils/introScroll";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelUnlockTimerRef = useRef(null);
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
            const nextIndex = Number(entry.target.dataset.index);
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        }),
      { threshold: 0.6 },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));

    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < 8) return;

      if (wheelLockRef.current) {
        event.preventDefault();
        return;
      }

      const section = sectionRef.current;
      const hero = document.getElementById("top");
      if (!section || !hero) return;

      const sectionRect = section.getBoundingClientRect();
      const isInsideIntro = sectionRect.top <= 1 && sectionRect.bottom > 1;
      const isReturningFromHero =
        event.deltaY < 0 && sectionRect.bottom <= 1 && sectionRect.bottom > -window.innerHeight;

      if (!isInsideIntro && !isReturningFromHero) return;

      event.preventDefault();

      const currentIndex = isReturningFromHero
        ? INTRO_SCENES.length
        : activeIndexRef.current;
      const nextIndex = getNextIntroIndex(
        currentIndex,
        event.deltaY,
        INTRO_SCENES.length,
      );
      const target =
        nextIndex === INTRO_SCENES.length ? hero : stepRefs.current[nextIndex];

      if (!target) return;

      wheelLockRef.current = true;
      activeIndexRef.current = Math.min(nextIndex, INTRO_SCENES.length - 1);
      setActiveIndex(activeIndexRef.current);
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      wheelUnlockTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelUnlockTimerRef.current);
      wheelLockRef.current = false;
    };
  }, [reducedMotion]);

  return (
    <section
      className="scroll-intro"
      aria-label="Portfolio introduction"
      ref={sectionRef}
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
