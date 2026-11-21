const EXPERIENCE = [
  { company: "InnoTrend Education", role: "AI Course Instructor", date: "2026.06 — 現在", text: "為不同公司團隊提供 AI 培訓，按職位、程度同工作需要調整練習；亦設計小學、中學、成人及企業課程。獨立籌辦 Codex、Gemini、Copilot 實用班，教授任務拆解、資料查證、Vibe Coding 同人工覆核。" },
  { company: "IBM", role: "Analyst Programmer", date: "2025.04 — 2025.08", text: "參與政府部門的數碼化項目，改善 microservices、API 同 WhatsApp／SMS／WeChat 通知模組。提升關鍵模組測試覆蓋率，處理已識別嘅 critical SonarQube 問題，並進行 K6 測試、reCAPTCHA Enterprise 整合同 AWS 監察。" },
  { company: "Venturenix Lab", role: "Programmer", date: "2023.06 — 2025.03", text: "開發招聘自動化工具、Spring Boot＋React Job Opening System 同合約生成功能。遷移 WordPress 到 Cloudways，帶領 junior developers 做每日 LeetCode 練習，協助籌辦 2024 MasterCode Java Competition。" },
  { company: "Management & Service", role: "團隊管理與客戶服務", date: "2013 — 2023", text: "曾於不同公司任職，累積預算、排更、客戶溝通同日常營運經驗。呢段背景，亦影響我今日點樣理解使用者同工作流程。" },
];

export default function Experience() {
  return <section className="experience section-pad" id="experience" aria-labelledby="experience-heading"><div className="section-shell experience__layout"><div className="section-intro"><p className="label">Experience</p><h2 id="experience-heading" className="section-title">做過開發。<br />理解營運。<br /><span>亦教人實作。</span></h2><p className="section-lead">由前線管理，到企業後端，再將工程方法帶入 AI 教學。</p></div><div className="experience__timeline">{EXPERIENCE.map((item) => <article className="experience-item" key={item.company}><p className="label">{item.date}</p><h3>{item.company}</h3><p className="experience-item__role">{item.role}</p><p>{item.text}</p></article>)}</div></div></section>;
}
