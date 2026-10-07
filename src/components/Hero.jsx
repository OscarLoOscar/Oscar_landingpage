import { useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      hero.style.removeProperty("--shift-x");
      hero.style.removeProperty("--shift-y");
      hero.style.setProperty("--glow-opacity", "0");
    };
    const move = (event) => {
      if (motion.matches || !pointer.matches) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty("--shift-x", `${(x - 0.5) * 12}px`);
        hero.style.setProperty("--shift-y", `${(y - 0.5) * 12}px`);
        hero.style.setProperty("--glow-x", `${x * 100}%`);
        hero.style.setProperty("--glow-y", `${y * 100}%`);
        hero.style.setProperty("--glow-color", x < 0.5 ? "108, 176, 228" : "222, 171, 82");
        hero.style.setProperty("--glow-opacity", "1");
      });
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
    };
  }, []);

  return (
    <header className="hero hero--dual" id="top" ref={heroRef}>
      <div className="hero__media" aria-hidden="true">
        <img className="hero__frame" src={assetUrl("assets/images/dual-world/2.png")} alt="" fetchPriority="high" />
      </div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Oscar Lo · Backend Engineer · AI Educator</p>
        <h1 className="hero__subtitle">寫好系統，<br />教懂 AI。</h1>
      </div>
      <nav className="hero__portals" aria-label="探索工程與教學">
        <a className="hero__portal hero__portal--code" href="#projects"><span>ENGINEERING</span>睇工程作品 <span aria-hidden="true">↗</span></a>
        <a className="hero__portal hero__portal--teach" href="#courses"><span>EDUCATION</span>了解 AI 課程 <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
