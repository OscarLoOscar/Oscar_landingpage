export default function About() {
  return (
    <section
      className="about section-pad"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="section-shell about__layout">
        <div>
          <p className="label">About Oscar</p>
          <h2 className="section-title" id="about-heading">
            技術要講得明，
            <br />
            成果要查得到。
          </h2>
          <p className="section-lead">
            由服務業及團隊管理轉型至軟件工程，習慣先理解人點做事，再決定工具點配合。
          </p>
          <p className="about__copy">
            以廣東話、英文及普通話溝通。持續參考 Microsoft AI
            curricula、Anthropic 同 DAIR.AI
            等公開教材自學，將來源查證、私隱、評估同人工驗收帶入實作及教學。
          </p>
        </div>
        <div className="about__details">
          <details>
            <summary>技術與 AI 工作方法</summary>
            <dl className="skills-list">
              <div>
                <dt>Backend</dt>
                <dd>
                  Java · Spring Boot · Python · Django · Microservices · REST
                  APIs · PyQt5
                </dd>
              </div>
              <div>
                <dt>Frontend & Data</dt>
                <dd>JavaScript · React · SQL · PostgreSQL · MySQL · Redis</dd>
              </div>
              <div>
                <dt>Delivery & Quality</dt>
                <dd>
                  AWS EC2／SES · Docker · Git／Git Flow · JUnit 5 · Mockito ·
                  Hamcrest · K6 · SonarQube · reCAPTCHA Enterprise
                </dd>
              </div>
              <div>
                <dt>AI Workflows</dt>
                <dd>
                  Codex · Cursor · ChatGPT · Gemini · Copilot · Grok Bot · Rules
                  · Skills · MCP · Obsidian；任務拆解、來源查證及生成結果覆核。
                </dd>
              </div>
            </dl>
          </details>
          <details>
            <summary>學歷與進修</summary>
            <ul className="education-list">
              <li>
                <strong>BSc (Hons) in Computing · Wrexham University</strong>
              </li>
              <li>
                <strong>
                  Qualifi Level 5 Extended Diploma in Information Technology
                </strong>
              </li>
              <li>
                <strong>SQL for Data Science · UC Davis</strong>
              </li>
              <li>
                <strong>Asana Workflow Specialist</strong>
              </li>
              <li>
                <strong>其他進修</strong>
                <span>
                  Data Science（Python）。公開 AI 教材屬自主學習，並非頒授資格。
                </span>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
