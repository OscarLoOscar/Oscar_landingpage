# GitHub Landing Page — Oscar Lo

個人 GitHub Profile / GitHub Pages 落地頁：靜態 HTML/CSS/JS，無需 build 步驟。展示 Hero、AI 課程（三個分頁）、關於我，以及可展開的 Tech Stack。

**Live site:** 部署後為 `https://<username>.github.io/`（user site）或 `https://<username>.github.io/<repo>/`（project site）。

## 功能

| 區塊 | 說明 |
|------|------|
| **Hero** | 全幅背景 + 標語（繁中） |
| **AI 課程** | Tab 切換：中學生 / 小學生 / 大人；每個 panel 為 split layout（圖 + 課程內容） |
| **關於我** | 文字介紹 + GitHub 連結；右側人像圖 |
| **Footer** | GitHub 連結、Tech Stack 展開面板（含 [devicons](https://github.com/devicons/devicon) 圖示） |

互動邏輯見 `js/main.js`：課程 tab 切換、Tech Stack 按鈕展開/收合（含 `aria-expanded`）。

## 技術

- HTML5（`lang="zh-Hant"`）
- CSS（自訂屬性、Grid、responsive）
- Vanilla JavaScript（無框架）
- 字體：[DM Sans](https://fonts.google.com/specimen/DM+Sans)（Google Fonts）

## 專案結構

```
github-landing-page/
├── index.html          # 主頁
├── css/
│   └── styles.css      # 樣式（Hero 背景圖路徑在此）
├── js/
│   └── main.js         # Tab + Tech Stack toggle
├── assets/
│   └── images/         # 圖片資源（見下表）
└── README.md
```

## 圖片資源

GitHub Pages **支援** `.png` 同 `.svg`。路徑請用相對網址（例如 `./assets/images/檔名.png`），**勿用**本機絕對路徑（如 `/Users/...`）。

| 檔案 | 用途 | 設定位置 |
|------|------|----------|
| `hero-bridge.svg` | Hero 背景 | `css/styles.css` → `.hero` |
| `secondarySchool.png` | 中學生課程圖 | `index.html` → 中學 panel |
| `primarySchool.png` | 小學生課程圖 | `index.html` → 小學 panel |
| `aduit.png` | 大人課程圖 | `index.html` → 大人 panel |
| `02_linkin.png` | 關於我區人像 | `index.html` → `.about-split__visual` |
| `about-professional.svg` | 關於我 fallback | `css/styles.css`（無 inline 圖時） |
| `course-ferris.svg` | 舊 placeholder | 可保留作備用 |

課程與 About 區在 HTML 使用 inline style，例如：

```html
<div class="course-split__visual" style="background-image: url('./assets/images/secondarySchool.png')"></div>
```

更詳細說明見 [`assets/images/README.md`](assets/images/README.md)。

> **注意：** PNG 檔案較大（約 1–2 MB/張）。上線前請 `git add assets/images/*.png` 並 push，否則 GitHub 上會 404。

## 本地預覽

### 方法一：Python（內建）

```bash
cd github-landing-page
python3 -m http.server 8080
```

瀏覽器打開：<http://localhost:8080>

### 方法二：VS Code Live Server

1. 用 VS Code **開啟資料夾** `github-landing-page`（作為專案根目錄）
2. 對 `index.html` 使用 **Open with Live Server**
3. 網址應類似 `http://127.0.0.1:5500/index.html`

**驗證圖片路徑：** 直接開 <http://127.0.0.1:5500/assets/images/secondarySchool.png> — 若 404，代表 Live Server 開錯上一層目錄，請重新以 `github-landing-page` 為根開啟。

## 部署到 GitHub Pages

1. 建立 repository（例如 `OscarLoOscar.github.io` 做 user site，或任意 repo 做 project site）
2. 推送專案內容到 `main` 分支（**包含** `assets/images/` 內所有圖片）
3. Repo → **Settings** → **Pages** → Source: **Deploy from branch** → `main` / `/ (root)`
4. 等待數分鐘後訪問 Pages URL

```bash
git init
git add .
git commit -m "Add landing page"
git remote add origin https://github.com/OscarLoOscar/<repo>.git
git push -u origin main
```

Footer Tech Stack 圖示使用外部 CDN（devicons / GitHub camo），需連網才能顯示。

## 自訂

| 項目 | 位置 |
|------|------|
| GitHub 連結 | `index.html` — 搜尋 `github.com/OscarLoOscar` |
| Hero 標語 | `index.html` — `.hero__title` |
| 課程文案 | `index.html` — `#courses` 各 panel |
| 關於我內容 | `index.html` — `#about` |
| 課程 / About 圖片 | `index.html` — `background-image: url('./assets/images/...')` |
| Hero 背景 | `css/styles.css` — `.hero` |
| 顏色與排版 | `css/styles.css` |
| 版權年份與名字 | `index.html` — `.copyright` |

## 疑難排解

| 現象 | 可能原因 |
|------|----------|
| 本地全部圖片不顯示 | Live Server 根目錄唔啱；或路徑用了 `/Users/...` |
| GitHub 有文字但無圖 | PNG 未 commit / push |
| Hero 有圖、課程無圖 | 檢查 `index.html` 內 `url('./assets/images/...')` 檔名大小寫 |
| Tech Stack 圖示無顯示 | 需網絡載入外部 SVG；檢查瀏覽器是否阻擋 |

## License

© 2026 Oscar Lo. All rights reserved.
# Oscar_landingpage
