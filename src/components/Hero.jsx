import { assetUrl } from "../utils/assetUrl";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <nav className="site-nav" aria-label="主要導覽">
        <div className="site-nav__inner">
          <div className="site-nav__links" style={{ flex: 1 }}>
            <a style={{ marginRight: "auto" }}></a>
            <a href="#projects">作品</a><a href="#courses">教學</a><a href="#experience">經驗</a>
            <a className="nav-contact" href="#course-contact">聯絡我</a>
          </div>
        </div>
      </nav>
      <div className="hero__layout section-shell">
        <div className="hero__content">
          <p className="label">Backend Engineer · Analyst Programmer · AI Course Instructor</p>
          <h1>寫好系統。<br /><span>教懂 AI。</span></h1>
          <p className="hero__lead">幫團隊將重複工作變成清晰流程，<br className="desktop-break" />帶學員由試用 AI，到有方法地完成作品。</p>
          <p className="hero__detail">This is Oscar。以 SpringBoot、Django 做後端開發，ReactJS做前端開發，亦為企業、學校同成人設計實用 AI 課程。</p>
          <div className="hero__actions">
            <a className="button" href="#projects">睇精選作品 <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#courses">了解 AI 培訓 <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="hero__visual">
          <img src={assetUrl("assets/images/dual-world/2.png")} alt="藍圖與紙張兩個世界交匯，象徵工程實作與教學" width="1672" height="941" fetchPriority="high" />
          <figcaption><span>Engineering meets education.</span><span>Hong Kong · 廣東話教學</span></figcaption>
        </figure>
      </div>
      <div className="hero__credentials section-shell" aria-label="工作背景">
        <span>企業後端 <strong>IBM</strong></span><span>開發與自動化 <strong>Venturenix Lab</strong></span><span>AI 教學 <strong>InnoTrend Education</strong></span>
      </div>
    </header>
  );
}
