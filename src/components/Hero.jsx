import { useState } from "react";

const stops = [
  [
    "Python Basics",
    "由變數、迴圈同函式開始，寫一個小型 Python 程式。"
  ],
  [
    "Dev Tools, APIs & Data",
    "用 Git、終端機同虛擬環境管理專案，串接 API 同處理 JSON。"
  ],
  [
    "LLM Basics",
    "了解 token、上下文同模型限制，練習設計清晰指令。"
  ],
  [
    "LLM Apps",
    "串接模型 API，將結構化輸出接入應用程式。"
  ],
  [
    "RAG",
    "將文件切段同索引，檢索相關資料，讓回答附上來源。"
  ],
  [
    "AI Agents",
    "將任務拆成步驟，讓 agent 選擇工具並核對結果。"
  ],
  [
    "MCP & A2A",
    "了解 MCP 點樣連接工具同資料，以及 A2A 點樣讓 agents 協作。"
  ],
  [
    "LangGraph",
    "用狀態圖組織 agent 流程，加入分支同人工確認。"
  ],
  [
    "Multi-Agent",
    "分配角色、界定交接格式，測試多個 agents 點樣合作。"
  ],
  [
    "Agent Memory",
    "分清當前對話同長期記憶，設計儲存、擷取同清除規則。"
  ],
  [
    "Evals & Safety",
    "用測試案例衡量答案質素，檢查權限、失敗情境同人工覆核。"
  ],
  [
    "Deploy",
    "部署應用，管理環境變數，加入日誌同監察。"
  ],
  [
    "Full-Stack AI",
    "將前端、後端、資料層同模型整合成可用產品。"
  ],
  [
    "Capstone Build",
    "揀一個真實問題，由需求、原型做到端到端驗證。"
  ],
  [
    "Ship & Present",
    "發佈成品，示範關鍵流程，交代成效、限制同下一步。"
  ]
];
const points = stops.map((_, i) => {
  const row = Math.floor(i / 3);
  const column = row % 2 === 0 ? i % 3 : 2 - i % 3;
  return [100 + column * 200, 36 + row * 72];
});
const route = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

export default function Hero() {
  const [selected, select] = useState(0);
  const [topic, description] = stops[selected];
  const href = selected < 12 ? "#courses" : "#projects";
  const action = selected < 12 ? "睇課程" : "睇工程作品";
  return (
    <header className="hero" id="top">
      <nav className="site-nav" aria-label="主要導覽">
        <div className="site-nav__inner">
          <div className="site-nav__links" style={{ flex: 1 }}>
            <a className="furrow-wordmark" href="#top" style={{ marginRight: "auto" }}>Oscar Lo</a>
            <a href="#projects">作品</a><a href="#courses">教學</a><a href="#experience">經驗</a>
            <a className="nav-contact" href="#course-contact">聯絡我</a>
          </div>
        </div>
      </nav>
      <div className="hero__layout section-shell">
        <div className="hero__content">
          <p className="label">Backend Engineer · Analyst Programmer · AI Course Instructor</p>
          <h1>寫好系統。<br />教懂 AI。</h1>
          <p className="hero__lead">幫團隊將重複工作變成清晰流程，<br className="desktop-break" />帶學員由試用 AI，到有方法地完成作品。</p>
          <p className="hero__detail">This is Oscar。以 SpringBoot、Django 做後端開發，ReactJS做前端開發，亦為企業、學校同成人設計實用 AI 課程。</p>
          <div className="hero__actions">
            <a className="button" href="#projects">睇精選作品 <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#courses">了解 AI 培訓 <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="furrow-map" aria-labelledby="roadmap-title">
          <figcaption id="roadmap-title">開發與 AI 路線圖</figcaption>
          <div className="furrow-map__sheet">
            <svg viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
              {Array.from({ length: 23 }, (_, i) => {
                const y = i * 21 - 155;
                return <path key={i} className="furrow-map__contour" d={`M-45 ${y + 96} C133 ${y + 227} 154 ${y - 122} 339 ${y + 36} S534 ${y + 210} 745 ${y - 26}`} />;
              })}
              <path className="furrow-map__water" d="M711 218 Q590 190 566 263 T318 358" />
              <path className="furrow-map__road-edge" d={route} />
              <path className="furrow-map__road" d={route} />
            </svg>
            <ol className="furrow-map__stops">
              {stops.map(([name], i) => (
                <li key={name} style={{ gridColumn: (points[i][0] + 100) / 200, gridRow: Math.floor(i / 3) + 1 }}>
                  <button type="button" className="furrow-map__pin" aria-pressed={selected === i} aria-controls="roadmap-entry" onClick={() => select(i)}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> {name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="furrow-map__entry" id="roadmap-entry" aria-live="polite">
            <h2>{topic}</h2><p>{description}</p><a href={href}>{action}</a>
          </div>
        </figure>
      </div>
      <div className="hero__credentials section-shell" aria-label="工作背景">
        <span>企業後端 <strong>IBM</strong></span><span>開發與自動化 <strong>Venturenix Lab</strong></span><span>AI 教學 <strong>InnoTrend Education</strong></span>
      </div>
    </header>
  );
}
