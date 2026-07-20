# 圖片說明

GitHub Pages **支援** `.png` 同 `.svg`，唔使轉格式。路徑要用相對網址，例如 `./assets/images/檔名.png`（唔好用本機絕對路徑如 `/Users/...`）。

| 檔案名稱 | 用途 |
|----------|------|
| `hero-bridge.svg` | Hero 全幅背景（`css/styles.css`） |
| `secondarySchool.png` / `primarySchool.png` / `aduit.png` | AI 課程區圖片（`index.html` inline style） |
| `02_linkin.png` | 關於我區右側人像 |
| `about-professional.svg` | 關於我區 fallback（若無 `02_linkin.png`） |

上 GitHub 前請確認所有圖片已 `git add` 並 push，否則線上會 404。

**Live Server：** 請用「開啟資料夾」選 `github-landing-page` 做根目錄，網址應類似 `http://127.0.0.1:5500/index.html`（唔好係上一層目錄）。
