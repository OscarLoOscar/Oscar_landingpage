import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKS } from "../constants/links";
import { assetUrl } from "../utils/assetUrl";

const HERO_SCENES = [
  { image: "hero-01-freelance.jpg", label: "Freelance delivery" },
  { image: "hero-02-ai-teaching.jpg", label: "AI education" },
  { image: "hero-03-vibe-coding.jpg", label: "Vibe Coding" },
  { image: "hero-04-digital-human.jpg", label: "Digital human production" },
];

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const frames = gsap.utils.toArray(".hero__frame");
      const sceneLabels = gsap.utils.toArray(".hero__scene");

      gsap.set(frames, { autoAlpha: 0, scale: 1.04 });
      gsap.set(frames[0], { autoAlpha: 1, scale: 1 });
      gsap.set(sceneLabels, { autoAlpha: 0, y: 8 });
      gsap.set(sceneLabels[0], { autoAlpha: 1, y: 0 });

      if (reduceMotion) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero__overlay", { opacity: 0.15 }, { opacity: 1, duration: 1.2 }, 0)
        .fromTo(
          [".hero__eyebrow", ".hero__subtitle"],
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.35, stagger: 0.18 },
          0.35,
        )
        .fromTo(
          ".hero__lead",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.45 },
          1.15,
        )
        .fromTo(
          ".hero__actions > a",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25, stagger: 0.15 },
          1.9,
        )
        .fromTo(
          ".hero__stats > li",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, stagger: 0.15 },
          2.65,
        );

      const scrollTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 2.4 : 3.2)}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline.to(".hero__content", { y: -36, scale: 0.98, autoAlpha: 0.62, duration: 3 }, 0);

      for (let index = 1; index < frames.length; index += 1) {
        const position = index;
        scrollTimeline
          .to(frames[index - 1], { autoAlpha: 0, scale: 1.08, duration: 0.45 }, position)
          .fromTo(
            frames[index],
            { autoAlpha: 0, scale: 1.04 },
            { autoAlpha: 1, scale: 1, duration: 0.45, immediateRender: false },
            position,
          )
          .to(sceneLabels[index - 1], { autoAlpha: 0, y: -8, duration: 0.25 }, position)
          .fromTo(
            sceneLabels[index],
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.35, immediateRender: false },
            position + 0.1,
          );
      }
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="hero__media" aria-hidden="true">
        {HERO_SCENES.map((scene, index) => (
          <img
            className="hero__frame"
            src={assetUrl(`assets/images/hero-series/${scene.image}`)}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            key={scene.image}
          />
        ))}
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__wash"></div>
      <div className="hero__content">
        <p className="hero__eyebrow">Backend Engineer · Analyst Programmer · Technical Educator</p>
        <h1 className="hero__subtitle">
          由服務業及團隊管理轉型至軟件工程，主力 Java · Spring Boot · Python · Django 後端，配合 React、Docker、AWS 交付可上線系統，並拓展 Android 與 AI 應用教學。
        </h1>
        <p className="hero__lead">
          Backend-first engineer across Java, Spring Boot, Python, and Django, with hands-on
          experience in PostgreSQL, MySQL, Redis, Docker, and AWS. I build and maintain production
          systems—from enterprise microservices to solo Django and React products—and teach others
          to apply AI and modern web tools in real workflows.
        </p>
        <div className="hero__actions">
          <a
            className="btn-outline btn-outline--light"
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LINKS.instagramLabel}
          </a>
          <a
            className="btn-outline btn-outline--light"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a className="btn-outline btn-outline--light" href="#courses">
            AI 課程
          </a>
          <a className="btn-outline btn-outline--light" href="#experience">
            Professional Experience
          </a>
        </div>
        <ul className="hero__stats" aria-label="Career highlights">
          <li>
            <span className="hero__stat-value">85%+</span>
            <span className="hero__stat-label">test coverage achieved on key IBM modules</span>
          </li>
          <li>
            <span className="hero__stat-value">4+ solo builds</span>
            <span className="hero__stat-label">
              from e-commerce and crawler systems to Chrome extensions
            </span>
          </li>
          <li>
            <span className="hero__stat-value">Live clients</span>
            <span className="hero__stat-label">
              ongoing maintenance for{" "}
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>{" "}
              and freelance delivery
            </span>
          </li>
        </ul>
      </div>
      <ol className="hero__sequence" aria-label="Portfolio services">
        {HERO_SCENES.map((scene, index) => (
          <li className="hero__scene" key={scene.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {scene.label}
          </li>
        ))}
      </ol>
    </header>
  );
}
