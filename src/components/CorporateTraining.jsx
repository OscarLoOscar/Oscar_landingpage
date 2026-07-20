import { LINKS } from "../constants/links";

export default function CorporateTraining() {
  return (
    <div className="course-corporate">
      <div className="course-corporate__hero">
        <span className="divider">+</span>
        <p className="label">企業 AI 培訓｜Workflow 設計｜實戰工作坊</p>
        <span className="divider">+</span>
        <h3 className="course-split__title">
          企業 GenAI 培訓
          <br />
          幫 team 把 AI 用喺日常工作
        </h3>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          為公司同機構度身安排實戰型 GenAI 培訓，唔係教員工死背 prompt 或者追新工具，而係幫團隊建立共用嘅 AI
          思維、互動習慣、輸出判斷同可落地 workflow。內容會按部門角色、學員底子同實際工作場景調整，涵蓋文件處理、資料整理、簡報溝通、數據分析、Agent
          應用同流程自動化，令 AI 變成 team 可以長期沿用嘅工作方法。
        </p>
        <p className="course-corporate__text">
          可以由 2-3 小時主題班開始，亦可以安排多節系列課、定期 AI 分享會，或者全日實作 workshop，按你哋嘅節奏同目標組合。
        </p>
        <div className="course-corporate__actions">
          <a
            className="btn-outline"
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            查詢企業培訓
          </a>
          <a className="btn-outline" href="#corporate-training-formats">
            了解培訓形式
          </a>
        </div>
        <p className="course-corporate__tags">短班 · 系列課 · 定期 session · 全日實作</p>
        <p className="course-corporate__tags">以真實部門 workflow 出發設計培訓</p>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <p className="label">培訓框架</p>
        <span className="divider">+</span>
        <p className="course-corporate__text course-corporate__text--center">
          由公司實際問題入手，設計可以即場練、可以判斷、可以帶返 office 用嘅 AI 方法。
        </p>
        <div className="course-corporate__grid course-corporate__grid--3">
          <article className="card">
            <p className="card__meta">思維</p>
            <h4 className="card__title">AI 思維</h4>
            <p className="card__text">學識拆 task、問清楚問題、檢查 AI 輸出</p>
          </article>
          <article className="card">
            <p className="card__meta">流程</p>
            <h4 className="card__title">AI Workflow</h4>
            <p className="card__text">接入報告、簡報、研究同日常數據工作</p>
          </article>
          <article className="card">
            <p className="card__meta">進階</p>
            <h4 className="card__title">Agent 與自動化</h4>
            <p className="card__text">了解 Agent、流程自動化同可控設計</p>
          </article>
        </div>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading">企業 AI 培訓要對準真正痛點</h4>
        <span className="divider">+</span>
        <p className="course-corporate__text course-corporate__text--center">
          好多 team 已經試過 ChatGPT、Gemini 或者其他 AI 工具，但未必用得穩、用得一致。
          <br />
          問題通常唔係「識唔識多幾個 app」，而係有冇共用方法、輸出標準、風險意識，同埋可唔可以真正嵌入部門 workflow。
        </p>
        <p className="label">現況評估</p>
        <h4 className="course-corporate__subheading">先了解現況，再定培訓重點</h4>
        <p className="course-corporate__text course-corporate__text--center">
          企業培訓應該先搞清楚 team 卡喺邊，再決定要補邊一類 AI 能力。
        </p>
        <p className="course-corporate__slogan">
          先診斷。
          <br />
          再有目標地教。
        </p>
        <div className="course-corporate__table-wrap">
          <table className="course-corporate__table">
            <thead>
              <tr>
                <th scope="col">常見現象</th>
                <th scope="col">核心問題</th>
                <th scope="col">培訓要補嘅能力</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>各自為政</td>
                <td>同事各自試 AI，但提問方式、輸出格式同檢查標準唔一致。</td>
                <td>建立 team 共用嘅 task 拆解、互動節奏同輸出 review 標準。</td>
              </tr>
              <tr>
                <td>用唔落實</td>
                <td>知道 AI 可以寫文、整理資料或做 deck，但唔知點接入實際工作。</td>
                <td>把 AI 接到 report、PPT、research、data work 同部門日常流程。</td>
              </tr>
              <tr>
                <td>缺判斷力</td>
                <td>AI 出得快，但 team 未必識追問、修正、核實資料同控制語氣。</td>
                <td>建立 output review、資料核對、human judgment 同負責任使用習慣。</td>
              </tr>
              <tr>
                <td>想再上一層</td>
                <td>開始關注 Agent、workflow automation 或 internal tools，但唔想一開始太 technical。</td>
                <td>理解可行場景、可控流程、限制同 human-in-the-loop 設計。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading">
          我嘅培訓方式：
          <br />
          教方法同判斷，唔只教 prompt
        </h4>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          有效嘅企業 AI 培訓，唔應該淨係 show 工具或者派 template，而係令學員學識拆問題、逐步互動、判斷輸出，再變成可以沿用嘅
          workflow。
        </p>
        <div className="course-corporate__compare-list">
          <div className="course-corporate__compare">
            <p className="course-corporate__compare-bad">教員工抄固定 prompt 或句式。</p>
            <p className="course-corporate__compare-good">教 team 先定目標，再逐步寫出更清楚嘅 AI 指令。</p>
          </div>
          <div className="course-corporate__compare">
            <p className="course-corporate__compare-bad">一次過塞晒所有要求，期望 AI 一次搞掂。</p>
            <p className="course-corporate__compare-good">用短 prompt 分步互動、追問同修正，建立真正嘅人機協作。</p>
          </div>
          <div className="course-corporate__compare">
            <p className="course-corporate__compare-bad">工具 list 愈長愈好，學完仍然唔知日常用邊個。</p>
            <p className="course-corporate__compare-good">按部門場景揀少量合適工具，專注解決真實工作問題。</p>
          </div>
          <div className="course-corporate__compare">
            <p className="course-corporate__compare-bad">只做 demo，睇完覺得有趣但返 office 唔知點做。</p>
            <p className="course-corporate__compare-good">幫 team 把 AI 放入實際 workflow，形成可重用、可判斷、可落地嘅方法。</p>
          </div>
        </div>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading">培訓完要有實際產出</h4>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          企業 AI 培訓唔應該止於「識多幾個工具」或者「試過幾個 demo」。更重要係 team 可唔可以將 AI
          變成日常輸出、資料處理、流程判斷同長期使用嘅方法。
        </p>
        <div className="course-corporate__grid course-corporate__grid--3">
          <article className="card card--feature">
            <p className="card__meta">01</p>
            <h4 className="card__title">日常文件與溝通</h4>
            <p className="card__text">令學員把 AI 用喺文件、簡報同對外溝通，而唔只係試工具。</p>
            <ul className="card__list">
              <li>改善 report、PPT、email、proposal、會議紀錄同 executive summary。</li>
              <li>學識拆 task、定輸出要求、逐步 refine AI 回覆。</li>
              <li>建立 review 習慣，識追問、修正同改善 AI 內容。</li>
            </ul>
          </article>
          <article className="card card--feature">
            <p className="card__meta">02</p>
            <h4 className="card__title">資料整理與分析</h4>
            <p className="card__text">協助 team 更有效做 research、摘要、數據理解同 business insights。</p>
            <ul className="card__list">
              <li>加快資料搜集、來源比較、PDF 摘要同 knowledge notes。</li>
              <li>用 AI 理解 spreadsheet、整理趨勢，轉成 business insights。</li>
              <li>把分析整理成清晰建議，支援討論、匯報同決策。</li>
            </ul>
          </article>
          <article className="card card--feature">
            <p className="card__meta">03</p>
            <h4 className="card__title">流程優化與進階應用</h4>
            <p className="card__text">由單一 task 延伸到部門 workflow，逐步探索更高價值嘅 AI 用法。</p>
            <ul className="card__list">
              <li>搵出部門 AI use cases，判斷邊啲 task 值得改善或半自動化。</li>
              <li>理解 Agent、workflow automation 同 human-in-the-loop 嘅可控應用。</li>
              <li>進階 workshop 可試 dashboard、web app prototype 或 internal tool 概念。</li>
            </ul>
          </article>
        </div>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading">可按需要組合嘅 GenAI 技能模組</h4>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          以下唔係固定 syllabus，而係可按公司目標、部門工作、學員程度同培訓時數自由組合嘅模組。每個主題都由真實工作 task
          出發，避免過度 technical，同時保留足夠實作深度。
        </p>
        <p className="course-corporate__tags">
          Prompt 設計 · 資料研究 · 商業溝通 · 數據分析 · Vibe Coding · Agent 與自動化
        </p>
        <div className="course-corporate__grid course-corporate__grid--2">
          <article className="card">
            <p className="card__meta">A · Prompt 與 Task 設計</p>
            <h4 className="card__title">拆解任務同設計有效指令</h4>
            <p className="card__text">用短 prompt 逐步釐清目標、限制、格式、語氣同輸出標準。</p>
          </article>
          <article className="card">
            <p className="card__meta">B · 研究與知識整理</p>
            <h4 className="card__title">資料搜集、摘要同內部知識管理</h4>
            <p className="card__text">支援 research、來源比較、PDF 摘要、meeting notes 同 team knowledge base。</p>
          </article>
          <article className="card">
            <p className="card__meta">C · 商業溝通</p>
            <h4 className="card__title">Report、PPT 同對外匯報</h4>
            <p className="card__text">協助 report writing、proposal、executive summary、deck structure 同 speaker notes。</p>
          </article>
          <article className="card">
            <p className="card__meta">D · 數據分析</p>
            <h4 className="card__title">AI 輔助 Data Analysis</h4>
            <p className="card__text">整理 spreadsheet、找出趨勢，將分析結果轉成 actionable insights。</p>
          </article>
          <article className="card">
            <p className="card__meta">E · Vibe Coding</p>
            <h4 className="card__title">Dashboard 同 Web App Prototype</h4>
            <p className="card__text">把想法、資料或流程快速變成 dashboard、web prototype 或 internal tool mockup。</p>
          </article>
          <article className="card">
            <p className="card__meta">F · Agent 與自動化</p>
            <h4 className="card__title">AI Agent 同 Workflow Automation</h4>
            <p className="card__text">了解 Agent 場景、流程設計、工具連接同 human-in-the-loop 應用。</p>
          </article>
        </div>
      </div>

      <div className="course-corporate__section">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading" id="corporate-training-formats">
          培訓形式可按公司節奏安排
        </h4>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          唔同公司同部門對 AI 嘅成熟度、應用目標同可用時間都唔同。可以由一節 2-3 小時開始，亦可以設計成系列課、定期 AI
          分享會或全日實作 workshop，按 team 節奏建立能力。實際示範同練習工具會按培訓目標、學員程度、公司政策同可用帳戶選用。
        </p>
        <div className="course-corporate__grid course-corporate__grid--2">
          <article className="card">
            <p className="card__meta">2-3 小時</p>
            <h4 className="card__title">單節主題班</h4>
            <p className="card__text">
              適合想快速建立共同 AI 語言、啟動 team 導入或做 awareness session 嘅公司。每節可聚焦一個清晰主題，例如 Prompt
              設計、AI Research、Report / PPT 或 Agent 概覽。
            </p>
          </article>
          <article className="card">
            <p className="card__meta">系列</p>
            <h4 className="card__title">多節企業課程</h4>
            <p className="card__text">
              適合想有系統地由基礎概念推進到 workflow 應用嘅 team。每節集中一個場景，逐步掌握 task 拆解、工具互動、輸出判斷同流程設計。
            </p>
          </article>
          <article className="card">
            <p className="card__meta">定期</p>
            <h4 className="card__title">AI 定期分享會</h4>
            <p className="card__text">
              適合需要持續追蹤 AI 趨勢、工具更新同內部應用案例嘅 team。可按月安排短 session，配合新工具、實用 workflow、部門問題同下一步方向。
            </p>
          </article>
          <article className="card">
            <p className="card__meta">全日</p>
            <h4 className="card__title">全日實作工作坊</h4>
            <p className="card__text">
              適合想集中實作、即場練習同整理部門 use cases 嘅公司。內容可包括示範、分組練習、真實 task 處理、workflow
              設計同後續落地方向。
            </p>
          </article>
        </div>
      </div>

      <div className="course-corporate__section course-corporate__cta">
        <span className="divider">+</span>
        <h4 className="course-corporate__heading">想為 team 安排企業 AI 培訓？</h4>
        <span className="divider">+</span>
        <p className="course-corporate__text">
          可以先講公司背景同培訓目標，唔使已有完整 syllabus。我會按 team 程度、工作場景同時間，建議合適嘅培訓形式。
        </p>
        <div className="course-corporate__actions">
          <a
            className="btn-outline"
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LINKS.instagramLabel}
          </a>
        </div>
        <p className="course-corporate__tags">
          2-3 小時主題班｜系列課程｜定期 AI session｜全日實作 workshop
        </p>
        <span className="divider">+</span>
        <h4 className="course-corporate__subheading">查詢前可簡單準備</h4>
        <ul className="course-list course-corporate__checklist">
          <li>公司 / 機構背景</li>
          <li>預計人數同學員程度</li>
          <li>最想解決嘅工作問題</li>
          <li>想涵蓋嘅主題同工具</li>
          <li>偏好形式、日期同時間</li>
        </ul>
        <span className="divider">+</span>
      </div>
    </div>
  );
}
