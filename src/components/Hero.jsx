import { useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";
import "../../css/money-gun.css";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup;
    import(/* @vite-ignore */ assetUrl("assets/money-gun/hero.js"))
      .then(({ mountHero }) => {
        if (!disposed) cleanup = mountHero(root.current);
      })
      .catch(() => {
        if (!disposed) {
          root.current.querySelector("#status").textContent =
            "作品槍未能載入，請檢查網絡後重新整理。";
        }
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <header className="money-hero" id="top" ref={root}>

    <div className="navigation">
      <a className="logo" href="#top" aria-label="This is Oscar 首頁">This is Oscar<span className="logo-dot">®</span></a>
      <nav aria-label="主要導覽">
        <a id="work-link" href="#projects">作品</a>
        <a href="#about">關於</a>
        <button type="button" data-dialog="process-dialog">流程</button>
        <a href="https://www.instagram.com/innotrendedu/" target="_blank" rel="noopener noreferrer">聯絡</a>
      </nav>
      <a className="talk" href="https://www.instagram.com/innotrendedu/" target="_blank" rel="noopener noreferrer">Want To Talk? <span aria-hidden="true">↗</span></a>
    </div>

    <section className="intro" aria-labelledby="hero-heading">
      <p className="eyebrow"><span aria-hidden="true">●</span> PORTFOLIO @2026</p>
      <h1 id="hero-heading">Hello,<br />This is <em>Oscar,</em><span className="roles">A Backend Engineer <span className="role-divider">/</span><br />Analyst Programmer <span className="role-divider">/</span><br />AI Course Instructor.</span></h1>
      <p className="intro-copy">我識嘅嘢都會係呢把槍射出嚟。<br className="mobile-break" />Click 一下，出一張。</p>
      <div className="actions">
        <button className="shoot primary" id="shoot" type="button" disabled><span>噴出作品</span><span aria-hidden="true">↖</span></button>
        <button className="clear" id="clear" type="button">收拾乾淨 <span aria-hidden="true">↺</span></button>
        <p className="counter">已噴出 <span id="count">0</span> 張</p>
      </div>
      <p className="status" id="status" role="status">正在準備作品槍…</p>
    </section>

    <div className="gun-stage" id="gun-stage">
      <canvas id="gun-canvas" aria-hidden="true"></canvas>
      <button className="gun-hit" id="gun-hit" type="button" aria-label="按一下噴出技能卡，按住連發" disabled></button>
    </div>

    <div className="playground" id="playground" aria-label="可以抓起來甩動嘅技能卡"></div>
    <div className="hero-footer">
      <p><span className="hint-dot" aria-hidden="true"></span>按住槍或空白鍵，連續噴發<span className="keycap" aria-hidden="true">SPACE</span></p>
    </div>

  <dialog id="process-dialog" aria-labelledby="process-heading">
    <button className="dialog-close" aria-label="關閉" type="button">×</button>
    <p className="eyebrow">HOW I WORK</p><h2 id="process-heading">拆解。實作。<br />覆核。</h2>
    <ol><li><strong>理解任務</strong>先釐清背景、限制同完成標準。</li><li><strong>逐步實作</strong>配合程式、AI 同合適工具完成小幅改動。</li><li><strong>檢查成果</strong>查證來源、測試行為，再交付。</li></ol>
  </dialog>
    </header>
  );
}
