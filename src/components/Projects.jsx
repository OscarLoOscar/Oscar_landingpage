export default function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="section-shell">
        <div className="section-intro">
          <span className="divider">+</span>
          <p className="label">GitHub Highlights</p>
          <span className="divider">+</span>
          <h2 id="projects-heading" className="section-title">
            Technical projects that reflect how I solve problems.
          </h2>
          <span className="divider">+</span>
          <p className="section-lead">
            Selected projects that emphasize independent execution: solo-built products, solo-owned
            automation, and systems I still maintain for real users and clients.
          </p>
        </div>

        <div className="projects__grid">
<article className="card"><p className="card__meta">私人專案 · Full-stack · Document Workflow</p><h3 className="card__title">合約生成與審批系統</h3><p className="card__text">以 React／TypeScript 前端配合 Spring Boot 後端，整合合約生成、審批、PDF 文件處理與 OCR，展示由操作介面、認證到資料管理嘅完整系統開發能力。</p><figure className="project-architecture" aria-label="合約生成與審批系統架構"><figcaption>架構示意 · 已省略內部資料</figcaption><ol><li>React／TypeScript 操作介面</li><li>Spring Boot · 認證／合約／審批</li><li>PostgreSQL 資料管理 ↔ PDF／OCR 文件處理</li></ol></figure><div className="tag-list" aria-label="Project features"><span className="tag">React</span><span className="tag">Spring Boot</span><span className="tag">PostgreSQL</span><span className="tag">PDF / OCR</span></div></article>
<article className="card"><p className="card__meta">Vibe Coding · Expense Tracker</p><h3 className="card__title"><a href="https://github.com/OscarLoOscar/vibe_coding_example" target="_blank" rel="noopener noreferrer">Cashline｜記帳工具</a></h3><p className="card__text">React＋Vite 記帳工具，支援新增、修改與刪除支出、搜尋篩選及分析圖表。以 Google Apps Script 連接 Google Sheets，並提供本機示範模式，適合作為 Vibe Coding 課程嘅實作案例。</p><div className="tag-list" aria-label="Project features"><span className="tag">React</span><span className="tag">Google Apps Script</span><span className="tag">Google Sheets</span><span className="tag">Recharts</span></div></article>
<article className="card"><p className="card__meta">Java · Financial Data</p><h3 className="card__title"><a href="https://github.com/OscarLoOscar/stock-exchange" target="_blank" rel="noopener noreferrer">金融數據後端</a></h3><p className="card__text">以 Spring Boot 建立行情與分析相關 API，配合 PostgreSQL、Redis 及 WebSocket 相關模組，展示金融數據處理、儲存與後端服務設計能力。</p><div className="tag-list" aria-label="Project features"><span className="tag">Spring Boot</span><span className="tag">PostgreSQL</span><span className="tag">Redis</span><span className="tag">WebSocket</span></div></article>
<article className="card"><p className="card__meta">私人專案 · API Integration</p><h3 className="card__title">招聘流程自動化</h3><p className="card__text">以 Java／Spring Boot 整合 Bullhorn 與 Google Sheets，包含登入、候選人相關操作及試算表追蹤服務。展示跨平台 API 整合與招聘工作流程自動化能力。</p><figure className="project-architecture" aria-label="招聘流程自動化架構"><figcaption>架構示意 · 已省略內部資料</figcaption><ol><li>Google Sheets · 作業資料／追蹤</li><li>Spring Boot · 登入／整合服務</li><li>Bullhorn API · 候選人相關操作</li></ol></figure><div className="tag-list" aria-label="Project features"><span className="tag">Java</span><span className="tag">Spring Boot</span><span className="tag">Bullhorn</span><span className="tag">Google Sheets</span></div></article>

          <article className="card">
            <p className="card__meta">AI · Prompt Library · Learning Tools</p>
            <h3 className="card__title">
              <a href="https://oscarlooscar.github.io/new_prompt-landing-page/" target="_blank" rel="noopener noreferrer">
                Prompt Atlas｜AI 指令庫
              </a>
            </h3>
            <p className="card__text">
              中英 Prompt 集中地，按用途分類、搜尋關鍵字及篩選來源。打開完整指令後一鍵複製，支援學習、日常工作與內容創作。
            </p>
            <div className="tag-list" aria-label="Project features">
              <span className="tag">Prompt Library</span>
              <span className="tag">Search &amp; Filter</span>
              <span className="tag">AI Learning</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">AI · Presentation Workflow · Prompt Studio</p>
            <h3 className="card__title">
              <a href="https://oscarlooscar.github.io/GoogleNotebookHTML/" target="_blank" rel="noopener noreferrer">
                Gemini Notebook｜簡報 Prompt Studio
              </a>
            </h3>
            <p className="card__text">
              設定簡報頁數、受眾、目的與敘事架構，整理大綱及視覺風格指令。提供即時 Prompt 預覽、配色與範本選擇，方便複製到 AI 工具繼續製作簡報。
            </p>
            <div className="tag-list" aria-label="Project features">
              <span className="tag">Presentation Prompts</span>
              <span className="tag">Visual Templates</span>
              <span className="tag">Cantonese</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">Django · E-commerce · Solo Build</p>
            <h3 className="card__title">
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>{" "}
              E-Commerce Website
            </h3>
            <p className="card__text">
              Independently designed and developed an e-commerce website in Django for{" "}
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>
              , covering the full development flow as a one-person builder rather than as one
              contributor on a team.
            </p>
            <p className="card__text">
              The project is not just a past build. I am still handling ongoing maintenance, which
              means taking responsibility for stability, fixes, and keeping the system usable over time.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Django</span>
              <span className="tag">E-commerce</span>
              <span className="tag">Solo Build</span>
              <span className="tag">Maintenance</span>
            </div>
          </article>


          <article className="card">
            <p className="card__meta">Python · Crawling · Solo Build</p>
            <h3 className="card__title">
              <a
                href="https://github.com/OscarLoOscar/crawl_JobsDB_v9"
                target="_blank"
                rel="noopener noreferrer"
              >
                JobsDB Crawling System
              </a>
            </h3>
            <p className="card__text">
              A one-person{" "}
              <a
                href="https://github.com/OscarLoOscar/crawl_JobsDB_v9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Python system
              </a>{" "}
              built to crawl JobsDB data for repeatable market research and recruitment support
              workflows.
            </p>
            <p className="card__text">
              The focus was not only data extraction, but building something practical enough to save
              time and support operational decisions in a repeatable way.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Python</span>
              <span className="tag">Crawler</span>
              <span className="tag">Automation</span>
              <span className="tag">Solo Build</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">Chrome Extension · WhatsApp · Solo Build</p>
            <h3 className="card__title">
              <a
                href="https://github.com/OscarLoOscar/whatsapp_call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome Send WhatsApp Extension
              </a>
            </h3>
            <p className="card__text">
              A{" "}
              <a
                href="https://github.com/OscarLoOscar/whatsapp_call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome extension
              </a>{" "}
              developed independently to streamline WhatsApp sending workflows and reduce repetitive
              manual messaging tasks.
            </p>
            <p className="card__text">
              It reflects the way I approach tools: identify the bottleneck, automate the pain point,
              and deliver something lightweight that solves a real operational problem.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Chrome Extension</span>
              <span className="tag">WhatsApp</span>
              <span className="tag">Automation</span>
              <span className="tag">Solo Build</span>
            </div>
          </article>
        </div>

        <div className="projects__cta">
          <a
            className="btn-outline"
            href="https://github.com/OscarLoOscar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
