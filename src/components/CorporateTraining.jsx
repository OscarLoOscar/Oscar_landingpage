import { LINKS } from "../constants/links";
import trainingIllustration from "../../assets/images/logistics-training-illustrated.png";

import practicePack from "../../assets/training/logistics-workflow-practice.md?url";

export default function CorporateTraining() {
  return (
    <div className="course-corporate" id="corporate-training">
      <header className="course-corporate__hero logistics-intro">
        <p className="label">企業 AI 培訓 · 物流文件實戰</p>
        <h3 className="course-split__title">由一張貨運文件，<br />建立一套團隊用得返嘅流程。</h3>
        <p className="course-corporate__text">已經用 AI 寫 prompt，下一步點樣接入日常工作？用物流公司嘅文件整理場景，練習資料抽取、欄位對照、Excel 填寫同人工覆核，將每次重新提問變成可以重複操作嘅工作方法。</p>
        <p className="logistics-duration">36 小時<span>（實習時間按學員程度計算）</span></p>
        <div className="course-corporate__actions">
          <a className="btn-outline" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">需求查詢 · 企業培訓</a>
          <a className="course-contact__link" href="#corporate-training-formats">睇課程安排 ↓</a>
        </div>
      </header>

      <section className="course-corporate__section logistics-section">
        <p className="label">由工作痛點開始</p>
        <h4 className="course-corporate__heading">文件格式唔同，唔代表每次都要由頭入過。</h4>
        <dl className="logistics-rows">
          <div><dt>重複輸入</dt><dd>客戶文件格式各異，人手搵欄位再打入公司表格。練習先整理資料，再按固定對照表填寫。</dd></div>
          <div><dt>費用分類</dt><dd>發票描述各有寫法，要逐項對應公司分類。練習保留每筆原文、按分類表入欄，唔清楚嘅類別先標記。</dd></div>
          <div><dt>資料難核對</dt><dd>多項貨物、缺欄位同金額差異容易漏睇。用檢查清單逐項對原文，唔清楚嘅位置交返指定同事確認。</dd></div>
          <div><dt>做完難重用</dt><dd>每個同事各自試 prompt，結果難接手。將步驟、填寫規則同交付格式記錄成團隊共用方法。</dd></div>
        </dl>
      </section>

      <section className="course-corporate__section logistics-section logistics-outcome">
        <p className="label">完成後做到乜</p>
        <h4 className="course-corporate__heading">由「識問 AI」，到交到一份有依據嘅表格。</h4>
        <p className="course-corporate__text">學員會用同一套規則處理另一份練習文件，交出填妥 Excel、欄位對照表、核對清單同操作 SOP。效率改善由減少重複整理開始，同時保留人工核對同異常確認。</p>
      </section>

      <section className="course-corporate__section logistics-section">
        <p className="label">文件試填案例</p>
        <h4 className="course-corporate__heading">先睇資料點樣走到 Excel。</h4>
        <article className="logistics-case">
          <p className="label">文字文件 → 欄位對照 → Excel</p>
          <h5>多項貨物，保留原有序號。</h5>
          <p>以同一間公司提供嘅 9 份 RTF 文件、共 10 項貨物試填：按檔名取得入倉號，將件數對應箱數、商品編號對應海關統計商品，並保留原文序號。未提供嘅資料留空，唔自行推算。</p>
          <div className="logistics-before-after" aria-label="RTF 到 Excel 欄位對照示意">
            <div><h6>處理前 · RTF 來源</h6><ul><li>檔名 → 入倉編號來源</li><li>件數、商品編號各有原文欄位</li><li>一份文件可能有多項貨物</li></ul></div>
            <div><h6>處理後 · Excel 對照</h6><ul><li>入倉號 ← 檔名（不含副檔名）</li><li>箱數 ← 件數</li><li>海關統計商品 ← 商品編號</li><li>逐項填寫，序號保留原文</li></ul></div>
          </div>
          <p className="logistics-note">欄位流程示意，並非原始文件截圖；客戶資料不公開。</p>
          <p className="logistics-note">呢批試填結果已由提供資料者確認正確。RTF 本身係文字文件，呢個案例並非 OCR，亦未驗證其他供應商版面。</p>
        </article>
        <article className="logistics-case">
          <p className="label">模擬發票 → OCR → 費用分類</p>
          <h5>由發票擷取資料，填入同一工作簿嘅新工作表。</h5>
          <p>使用虛構交易資料製作嘅發票，擷取主提單號碼、所有費用描述同金額，再按指定欄位分類填寫。示範包含 5 項費用，合計 HK$2,034，結果已核對。</p>
          <div className="logistics-before-after" aria-label="發票到分類工作表示意">
            <div><h6>處理前 · 模擬發票</h6><ul><li>主提單號碼</li><li>5 項費用描述及各項金額</li><li>需要按公司分類表對應</li></ul></div>
            <div><h6>處理後 · 同一工作簿新工作表</h6><ul><li>主提單號碼對應指定欄位</li><li>每項費用保留描述、分類及金額</li><li>核對合計：HK$2,034</li></ul></div>
          </div>
          <p className="logistics-note">整理方式示意；不公開原始發票或公司識別資料。</p>
          <p className="logistics-note">呢份發票用作流程示範；同類費用合併規則仍需按公司要求確認。以上屬案例試驗，並非學員成效或正式系統準確率。</p>
        </article>
      </section>

      <section className="course-corporate__section logistics-section">
        <p className="label">可重複操作嘅方法</p>
        <h4 className="course-corporate__heading">五步完成一次文件處理。</h4>
        <ol className="logistics-workflow">
          <li><strong>準備</strong><p>揀文件、遮敏感資料，確認目標表格。</p></li>
          <li><strong>抽取</strong><p>分清文字檔同掃描檔，保留原文依據。</p></li>
          <li><strong>對照</strong><p>確認欄位、單位、分類同留空規則。</p></li>
          <li><strong>入表</strong><p>先填副本，保留工作表同原有格式。</p></li>
          <li><strong>覆核</strong><p>對序號、件數、金額；異常交人確認。</p></li>
        </ol>
        <div className="logistics-comparison">
          <p><span>只試 prompt</span>每次重新講要求，出到答案就當完成。</p>
          <p><span>課堂練習方式</span>用固定輸入、欄位規則同核對清單，完成一次後再用另一份文件重做。</p>
        </div>
      </section>

      <figure className="logistics-scene">
        <img src={trainingIllustration} width="1254" height="1254" loading="lazy" alt="物流公司培訓現場插畫：導師與團隊討論貨運文件及關鍵欄位" />
        <figcaption><strong>物流公司 · 培訓現場紀錄</strong><span>按實際培訓相片作 AI 插畫處理；用作活動紀錄，並非客戶推薦見證。</span></figcaption>
      </figure>

      <section className="course-corporate__section logistics-section">
        <p className="label">由工程實作帶入教學</p>
        <h4 className="course-corporate__heading">教文件流程，亦理解系統點樣接手。</h4>
        <p className="course-corporate__text">我係 Oscar Lo，曾於 IBM 參與企業後端開發，喺 Venturenix Lab 做自動化及教學相關工作，亦有物流 freelance 文件處理、SQL 同 OCR 開發經驗。課堂會將工程上嘅欄位規則、資料追溯同逐步驗證，轉化成團隊可以練習嘅操作方法。</p>
        <div className="course-corporate__actions"><a className="course-contact__link" href="#experience">睇工作經驗與技術背景 ↗</a></div>
      </section>

      <section className="course-corporate__section logistics-section" id="corporate-training-formats">
        <p className="label">課程安排</p>
        <h4 className="course-corporate__heading">36 小時，由跟住做到自己重做。</h4>
        <p className="course-corporate__text">實習時間按學員程度計算。適合識基本 Excel、已試過 AI 提問，但未建立共用流程嘅物流團隊。</p>
        <dl className="logistics-rows">
          <div><dt>建立規則</dt><dd>認識文件種類與目標表格，練習遮資料、抽取欄位、記錄來源，建立欄位對照表。</dd></div>
          <div><dt>完成試填</dt><dd>練習多項貨物、缺資料、費用分類與 Excel 匯入；以副本操作，核對原文及總數。</dd></div>
          <div><dt>重做與交接</dt><dd>換文件重做，記錄異常處理方式，整理可交接嘅操作步驟及核對清單。</dd></div>
        </dl>
        <div className="logistics-deliverables"><h5>學員最終帶走</h5><ul><li>填妥嘅 Excel 練習副本</li><li>欄位對照表：來源、目標、填寫規則</li><li>核對清單：必查項目、異常及確認人</li><li>操作 SOP：處理次序、留空規則同交接方法</li></ul></div>
      </section>

      <section className="course-corporate__section logistics-section logistics-offer">
        <p className="label">教材與驗收</p>
        <h4 className="course-corporate__heading">帶走範本，換一份文件繼續用。</h4>
        <dl className="logistics-rows">
          <div><dt>教材與範本</dt><dd>文件處理 SOP、欄位對照表、核對清單，以及抽取、填表、覆核三組可重用指令。</dd></div>
          <div><dt>實作練習</dt><dd>由示範跟做到換文件獨立重做，練習多項貨物、資料缺漏同費用分類，再由同伴覆核。</dd></div>
          <div><dt>驗收標準</dt><dd>貨物及費用行齊全、欄位可追溯原文、金額已核對、異常有記錄，而且另一位同事可以跟 SOP 重做。</dd></div>
        </dl>
        <div className="course-corporate__actions"><a className="btn-outline" href={practicePack} download="物流AI文件處理練習包.md">下載練習包 · Markdown</a></div>
        <p className="logistics-note">提供可編輯文字範本；Excel 練習副本由課堂按指定表格完成，下載包不包含客戶文件。</p>
      </section>

      <section className="course-corporate__section logistics-section logistics-faq">
        <p className="label">報名前想了解</p>
        <h4 className="course-corporate__heading">常見問題</h4>
        <details><summary>要識寫程式先學到？</summary><p>唔需要。以識基本 Excel 同檔案操作為起點，重點係拆解工作、整理規則同檢查結果。</p></details>
        <details><summary>免費 AI 帳戶可唔可以參加？</summary><p>先以免費帳戶規劃，課前確認公司可用嘅 Copilot、Gemini、ChatGPT 或 NotebookLM。檔案上傳、使用額度同匯出能力按帳戶而異；需要時用文字抽取及手動匯入，唔保證免費版直接編輯 Excel。</p></details>
        <details><summary>需要提供公司真實文件？</summary><p>可以先用模擬或已遮敏感資料嘅文件。使用公司資料前，先確認內部政策、工具權限同分享範圍。</p></details>
        <details><summary>36 小時點樣安排？</summary><p>物流培訓內容統一為 36 小時（實習時間按學員程度計算）。分節日期及每節實作安排，會按團隊程度與工作時間確認。</p></details>
        <details><summary>學完係咪可以全自動處理所有單據？</summary><p>課程交付係可重複操作嘅文件流程。新供應商版面仍需測試；分類不明、資料缺漏或金額不符要由公司指定同事確認。正式串接內部系統需另外評估。</p></details>
      </section>

      <section className="course-corporate__section course-corporate__cta logistics-enquiry">
        <p className="label">需求查詢</p>
        <h4 className="course-corporate__heading">由你哋最花時間嘅一份文件開始。</h4>
        <p className="course-corporate__text">透過 Instagram 聯絡宏業創科教育，簡單講團隊人數、AI 使用程度、可用工具同想改善嘅文件工作。初次查詢毋須傳送機密文件。</p>
        <div className="course-corporate__actions"><a className="btn-outline" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">需求查詢 · 提交工作流程需求</a></div>
      </section>
    </div>
  );
}
