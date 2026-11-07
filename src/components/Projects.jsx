const PROJECTS = [
  { name: "Prompt Atlas", type: "公開工具 · Prompt 指令庫", theme: "atlas", title: "好用嘅指令，搵得到，亦拎得走。", text: "將可重用 Prompt 集中整理，支援搜尋、分類篩選、完整閱讀同一鍵複製，方便日常使用同備課。", steps: ["搜尋任務", "揀選指令", "複製使用"], tags: "Search · Categories · Source references", href: "https://oscarlooscar.github.io/new_prompt-landing-page/", action: "打開指令庫" },
  { name: "Gemini Notebook", type: "公開工具 · Prompt Studio", theme: "notebook", title: "先想清楚內容，再整理視覺。", text: "將 brief、受眾、敘事架構同視覺偏好，整理成可複製嘅簡報指令。分兩步處理廣東話大綱同視覺要求。", steps: ["輸入 brief", "整理大綱", "產生視覺指令"], tags: "Content outline · Presentation prompts", href: "https://oscarlooscar.github.io/GoogleNotebookHTML/", action: "打開 Prompt Studio" },
  { name: "Cashline", type: "教學示範 · Expense Tracker", theme: "cashline", title: "由需求規格，到一個記帳工具。", text: "React＋Vite 示範專案，包含支出增刪改、搜尋篩選、總額同圖表。接 Google Apps Script／Google Sheets，亦提供本機 demo mode。", steps: ["記錄支出", "搜尋與篩選", "查看分析"], tags: "React · Vite · Google Sheets", href: "https://github.com/OscarLoOscar/vibe_coding_example", action: "睇示範原始碼" },
];

export default function Projects() {
  return (
    <section className="projects section-pad" id="projects" aria-labelledby="projects-heading">
      <div className="section-shell">
        <div className="section-intro"><p className="label">Selected work</p><h2 id="projects-heading" className="section-title">唔只講做法。<br />打開作品睇。</h2><p className="section-lead">由可直接使用嘅工具，到有原始碼嘅教學示範，逐個了解點樣解決問題。</p></div>
        <div className="projects__grid">
          {PROJECTS.map((project, index) => (
            <article className={`project-card project-card--${project.theme}`} key={project.name}>
              <div className="project-card__visual" aria-label={`${project.name} 功能流程示意`}>
                <div className="project-card__topline"><span>0{index + 1}</span><span>功能流程示意</span></div>
                <p className="project-card__name">{project.name}</p>
                <ol className="project-flow">{project.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>
              <div className="project-card__body"><p className="label">{project.type}</p><h3>{project.title}</h3><p>{project.text}</p><p className="project-card__tags">{project.tags}</p><a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.action} <span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
        <details className="more-projects"><summary>更多工程專案與個人 AI 實作</summary>
          <div className="practice-grid">
            <article><p className="label">個人實作 · OpenAI Codex</p><h3>招聘研究 workflow</h3><p>指導 Codex 輔助檢視 1,488 個 JobsDB 搜尋結果摘要，再打開 286 個候選招聘廣告深入檢視，整理 CV 配對 shortlist、來源連結同 CSV 覆核記錄。</p><p>評分由 AI 草擬，資格、來源同建議由人覆核；支援表格及來源連結可按要求提供。</p></article>
            <article><p className="label">個人實作 · Grok Bot</p><h3>日常營運整理</h3><p>用於研究、檢視來信、協助對帳、草擬週報，以及留意網站留言、登記同查詢；將研究及營運記錄整理到 Notion。</p><p>個人使用流程，並非對外產品或客戶成效見證。</p></article>
            <article><p className="label">Python · PyQt5</p><h3>JobsDB Crawling System</h3><p>以 GUI 工具支援可重複嘅招聘研究同資料擷取。</p><a className="text-link" href="https://github.com/OscarLoOscar/crawl_JobsDB_v9" target="_blank" rel="noopener noreferrer">查看原始碼 ↗</a></article>
            <article><p className="label">JavaScript · Chrome Extension</p><h3>WhatsApp 工作流程工具</h3><p>為內部重複招聘訊息操作建立瀏覽器 extension。</p><a className="text-link" href="https://github.com/OscarLoOscar/whatsapp_call" target="_blank" rel="noopener noreferrer">查看原始碼 ↗</a></article>
            <article><p className="label">Django · E-commerce</p><h3>個人電商網站專案</h3><p>以 Django 開發電商網站，將後端開發應用到完整網站專案。</p><a className="text-link" href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">查看網站 ↗</a></article>
          </div>
        </details>
      </div>
    </section>
  );
}
