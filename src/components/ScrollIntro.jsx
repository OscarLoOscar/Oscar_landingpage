import { useEffect, useRef, useState } from "react";
import { INTRO_SCENES } from "../constants/introScenes";

export default function ScrollIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const activeScene = INTRO_SCENES[activeIndex];

  useEffect(() => {
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
  }, []);

  return (
    <section className="scroll-intro" aria-label="Portfolio introduction">
      <div className="scroll-intro__stage" data-active-index={activeIndex}>
        <div className="scroll-intro__visual" aria-hidden="true" />
        <div className="scroll-intro__copy">
          <p className="scroll-intro__label">{activeScene.label}</p>
          <h1 className="scroll-intro__title">{activeScene.title}</h1>
          <p className="scroll-intro__description">{activeScene.description}</p>
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
            </a>
          ))}
        </nav>
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
