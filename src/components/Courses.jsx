import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import CourseCompareList from "./CourseCompareList";
import CourseContactCta from "./CourseContactCta";
import CourseLightboxImage from "./CourseLightboxImage";
import CorporateTraining from "./CorporateTraining";
import Lightbox from "./Lightbox";

const TEACHING_PHILOSOPHY = [
  {
    bad: "把 AI 當作「標準答案機」，抄完就算。",
    good: "教學員先理解問題，再用 AI 輔助思考、整理同修正。",
  },
  {
    bad: "一次過丟晒所有要求，期望 AI 幫你完成成件事。",
    good: "分步提問、逐步收窄範圍，建立可重複嘅互動習慣。",
  },
  {
    bad: "工具名單愈長愈好，學完仍然唔知點樣用喺自己場景。",
    good: "按學員年齡同用途揀合適工具，專注解決真實功課或工作問題。",
  },
  {
    bad: "只做 flashy demo，學員離開課堂就唔知點繼續。",
    good: "提供可帶走嘅 workflow 同判斷標準，回到學校或公司都用到。",
  },
];

const VIBE_CODING_PHILOSOPHY = [
  {
    bad: "一次過叫 AI 改晒成個 project，唔 review 就 merge。",
    good: "Small increment + review：一次只改一小部分，每步 check pattern 同 shared code。",
  },
  {
    bad: "唔 setup Cursor Rules / MCP，靠運氣同 AI 即興發揮。",
    good: "用 Rules、Skills 同 MCP 建立 guardrails，將知識同 workflow 帶入開發。",
  },
  {
    bad: "Greenfield 咁做 brownfield：唔 map project 就改 legacy code。",
    good: "先定位畫面、梳理 data flow，再喺可控範圍內改 A 唔壞 B。",
  },
  {
    bad: "只追速度，唔做 Git branch / test / deploy check。",
    good: "配合 Git & GitHub、測試同交付節奏，令 AI 協作真正上 production。",
  },
];

const FORMAT_LADDER = [
  {
    meta: "試堂",
    title: "2-3 小時體驗課",
    text: "適合第一次接觸 AI 嘅學生、家長或 team，快速了解一個清晰主題，例如 AI 素養、Cursor 入門或短片創作。",
  },
  {
    meta: "系列",
    title: "多節循序課程",
    text: "按週或按單元推進，適合中學生、小學生或企業 team 逐步建立共用方法同輸出標準。",
  },
  {
    meta: "12 小時",
    title: "大人實用進階班",
    text: "集中處理文件、研究、溝通同日常效率，適合 admin、老闆、家長或退休學員。",
  },
  {
    meta: "全日",
    title: "實作工作坊",
    text: "即場做 project、整理 use case、完成 deliverable，適合 Vibe Coding、企業培訓或數字人廣告。",
  },
];

const TABS = [
  { id: "secondary", label: "中學生", panelId: "panel-secondary", tabId: "tab-secondary" },
  { id: "primary", label: "小學生", panelId: "panel-primary", tabId: "tab-primary" },
  { id: "adults", label: "大人", panelId: "panel-adults", tabId: "tab-adults" },
  {
    id: "corporate",
    label: "企業AI培訓",
    panelId: "panel-corporate",
    tabId: "tab-corporate",
  },
  { id: "vibe-coding", label: "Vibe Coding", panelId: "panel-vibe-coding", tabId: "tab-vibe-coding" },
  { id: "digital-human", label: "數字人廣告", panelId: "panel-digital-human", tabId: "tab-digital-human" },
];

const PRIMARY_IMAGES = [
  {
    src: "assets/images/primary-01.png",
    alt: "【給孩子的智能第一課】小學生 AI 啟蒙初階班：從懂得到創造的思維旅程",
  },
  {
    src: "assets/images/primary-02.png",
    alt: "我們的核心教學信念 Teaching Moment",
  },
  {
    src: "assets/images/primary-03.png",
    alt: "小學生 AI 啟蒙課程：思維之旅 — 四大模組",
  },
  {
    src: "assets/images/primary-04.png",
    alt: "呢個課程啱邊啲小朋友？完課後小朋友可以獲得什麼？",
  },
];

const VIBE_IMAGES = [
  {
    src: "assets/images/vibe_Coding_01.png",
    alt: "AI Coding: Greenfield vs Brownfield",
  },
  {
    src: "assets/images/vibe_Coding_02.png",
    alt: "點解 AI 改 A 壞 B？",
  },
  {
    src: "assets/images/vibe_Coding_03.png",
    alt: "Brownfield AI Coding Workflow",
  },
  {
    src: "assets/images/vibe_Coding_04.png",
    alt: "Context Engineering — Prompt 唔係最重要",
  },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState("secondary");
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (gallery, index) => {
    setLightbox({ gallery, index });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const lightboxImages = lightbox?.gallery === "primary" ? PRIMARY_IMAGES : VIBE_IMAGES;

  return (
    <section className="courses" id="courses" aria-labelledby="courses-heading">
      <div className="courses__intro">
        <span className="divider">+</span>
        <h2 id="courses-heading" className="section-title">
          AI 課程
        </h2>
        <span className="divider">+</span>
        <p className="section-lead">
          為中學生、小學生、成年人及企業而設，按年齡、程度同需要調整內容與節奏。
        </p>
      </div>

      <CourseCompareList
        heading="我的教學重點：教判斷同方法，唔只教 prompt"
        items={TEACHING_PHILOSOPHY}
      />

      <div className="course-formats" id="course-formats">
        <span className="divider">+</span>
        <p className="label">課程形式 / 時長</p>
        <span className="divider">+</span>
        <p className="section-lead">
          可按對象同目標自由組合：由短試堂開始，到系列課、12 小時實用班，或者全日實作 workshop。
        </p>
        <div className="course-formats__grid">
          {FORMAT_LADDER.map((format) => (
            <article className="card" key={format.meta}>
              <p className="card__meta">{format.meta}</p>
              <h3 className="card__title">{format.title}</h3>
              <p className="card__text">{format.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="course-tabs" role="tablist" aria-label="課程類別">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`course-tab${activeTab === tab.id ? " is-active" : ""}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={tab.panelId}
            id={tab.tabId}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="course-panels">
        <article
          className={`course-panel${activeTab === "secondary" ? " is-active" : ""}`}
          id="panel-secondary"
          role="tabpanel"
          aria-labelledby="tab-secondary"
          hidden={activeTab !== "secondary"}
        >
          <div
            className="course-split"
            data-panel="secondary"
          >
            <div
              className="course-split__visual"
              style={{ backgroundImage: `url('${assetUrl("assets/images/secondarySchool.png")}')` }}
            ></div>
            <div className="course-split__body">
              <span className="divider">+</span>
              <p className="label">中三至中四 · 中學生</p>
              <span className="divider">+</span>
              <h3 className="course-split__title">中學 AI 課程</h3>
              <span className="divider">+</span>
              <ul className="course-list">
                <li>AI 基礎概念、能力邊界與負責任使用</li>
                <li>Prompt 技巧：功課研究、報告整理、批判思考</li>
                <li>專題與學習輔助：如何引用、避免抄襲</li>
                <li>簡介程式思維 + AI 協作（配合學校需要）</li>
                <li>資訊安全、私隱與網絡素養</li>
              </ul>
              <span className="divider">+</span>
              <p className="course-audience">
                <strong>適合：</strong>中三至中四學生，希望為 DSE 及未來升學打好 AI 素養基礎。
              </p>
              <span className="divider">+</span>
            </div>
          </div>
        </article>

        <article
          className={`course-panel${activeTab === "primary" ? " is-active" : ""}`}
          id="panel-primary"
          role="tabpanel"
          aria-labelledby="tab-primary"
          hidden={activeTab !== "primary"}
        >
          <div className="course-split course-split--match-height course-split--primary-images">
            <div className="course-split__visual course-split__visual--image">
              <img src={assetUrl("assets/images/primarySchool.png")} alt="小學生 AI 啟蒙初階班" />
            </div>
            <div className="course-split__body course-split__body--images">
              <div className="course-split__scroll" tabIndex={0} aria-label="小學生 AI 課程內容">
                {PRIMARY_IMAGES.map((image, index) => (
                  <CourseLightboxImage
                    key={image.src}
                    src={assetUrl(image.src)}
                    alt={image.alt}
                    onOpen={() => openLightbox("primary", index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        <article
          className={`course-panel${activeTab === "adults" ? " is-active" : ""}`}
          id="panel-adults"
          role="tabpanel"
          aria-labelledby="tab-adults"
          hidden={activeTab !== "adults"}
        >
          <div className="course-split course-split--reverse">
            <div
              className="course-split__visual"
              style={{ backgroundImage: `url('${assetUrl("assets/images/aduit.png")}')` }}
            ></div>
            <div className="course-split__body">
              <span className="divider">+</span>
              <p className="label">成年人 · 實用導向</p>
              <span className="divider">+</span>
              <h3 className="course-split__title">12小時 大人 AI 課程</h3>
              <span className="divider">+</span>
              <ul className="course-list">
                <li>
                  <strong>公司 Admin：</strong>文件處理、會議紀要、Email 與辦公自動化
                </li>
                <li>
                  <strong>中小企老闆：</strong>營運效率、客服用語、簡單 marketing 與流程優化
                </li>
                <li>
                  <strong>家長 / 老師：</strong>如何引導子女或學生安全、有效地使用 AI
                </li>
                <li>
                  <strong>退休人士：</strong>日常資訊搜尋、通訊、興趣學習，一步一步慢慢學
                </li>
              </ul>
              <span className="divider">+</span>
              <p className="course-audience">
                <strong>目標：</strong>唔使寫程式，學識用 AI 解決真實工作同生活問題。
              </p>
              <span className="divider">+</span>
            </div>
          </div>
        </article>

        <article
          className={`course-panel${activeTab === "corporate" ? " is-active" : ""}`}
          id="panel-corporate"
          role="tabpanel"
          aria-labelledby="tab-corporate"
          hidden={activeTab !== "corporate"}
        >
          <CorporateTraining />
        </article>

        <article
          className={`course-panel${activeTab === "vibe-coding" ? " is-active" : ""}`}
          id="panel-vibe-coding"
          role="tabpanel"
          aria-labelledby="tab-vibe-coding"
          hidden={activeTab !== "vibe-coding"}
        >
          <div className="course-split course-split--match-height">
            <div className="course-split__visual course-split__visual--image course-split__visual--scroll">
              <div className="course-split__scroll" tabIndex={0} aria-label="Vibe Coding 課程內容">
                {VIBE_IMAGES.map((image, index) => (
                  <CourseLightboxImage
                    key={image.src}
                    src={assetUrl(image.src)}
                    alt={image.alt}
                    onOpen={() => openLightbox("vibe", index)}
                  />
                ))}
              </div>
            </div>
            <div className="course-split__body">
              <span className="divider">+</span>
              <p className="label">AI 輔助開發 · Cursor</p>
              <span className="divider">+</span>
              <h3 className="course-split__title">Vibe Coding</h3>
              <span className="divider">+</span>
              <ul className="course-list">
                <li>用 Cursor 寫 code：Chat、Composer、Inline Edit 實戰</li>
                <li>Prompt 技巧：需求拆解、重構、debug、code review</li>
                <li>Set up Cursor Rules：repo 規範、prompt 模板、產出格式同 review 風格</li>
                <li>Skills / Connect MCP：例如連 Notion/ 其他 MCP servers，<br></br>將知識帶入工作流</li>
                <li>由 0 到 1 起 project：結構、命名、測試同交付節奏</li>
                <li>Git &amp; GitHub：branch/PR/commit message 規範，<br></br>配合 Pages/CI 交付</li>
                <li>AI 協作習慣：何時信 AI、幾時人手 check</li>
                <li>真實場景：landing page、小工具快速交付</li>
              </ul>
              <span className="divider">+</span>
              <p className="course-audience">
                <strong>適合：</strong>想用 Cursor 加快開發、學習 AI pair programming 嘅初學至中階開發者。
              </p>
              <span className="divider">+</span>
            </div>
          </div>
          <CourseCompareList
            heading="Vibe Coding：唔係求快，而係可控地交付"
            items={VIBE_CODING_PHILOSOPHY}
          />
        </article>

        <article
          className={`course-panel${activeTab === "digital-human" ? " is-active" : ""}`}
          id="panel-digital-human"
          role="tabpanel"
          aria-labelledby="tab-digital-human"
          hidden={activeTab !== "digital-human"}
        >
          <div className="course-split course-split--reverse">
            {/* 圖片來源後補 */}
            <div className="course-split__visual"></div>
            <div className="course-split__body">
              <span className="divider">+</span>
              <p className="label">AI 短片 · 數字人廣告</p>
              <span className="divider">+</span>
              <h3 className="course-split__title">數字人廣告</h3>
              <span className="divider">+</span>
              <ul className="course-list">
                <li>
                  用{" "}
                  <a
                    href="https://jimeng.jianying.com/ai-tool/home?activeTab=short_video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    即梦 AI
                  </a>{" "}
                  一站式創作短片同廣告素材
                </li>
                <li>數字人形象、口播腳本、分鏡同短片生成流程</li>
                <li>由產品賣點到廣告文案：prompt 同鏡頭節奏</li>
                <li>品牌短片、社交媒體廣告、教學宣傳片實戰</li>
                <li>輸出、剪輯同發佈：點樣快速交付可用素材</li>
              </ul>
              <span className="divider">+</span>
              <p className="course-audience">
                <strong>適合：</strong>中小企、教育機構、創作者，想用 AI 做數字人廣告同短片嘅學員。
              </p>
              <span className="divider">+</span>
            </div>
          </div>
        </article>
      </div>

      <CourseContactCta />

      {lightbox && (
        <Lightbox
          images={lightboxImages}
          index={lightbox.index}
          onClose={closeLightbox}
          onChange={(nextIndex) => setLightbox((current) => ({ ...current, index: nextIndex }))}
        />
      )}
    </section>
  );
}
