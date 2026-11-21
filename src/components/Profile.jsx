export default function Profile() {
  return (
    <section className="profile section-pad" id="profile" aria-labelledby="profile-heading">
      <div className="section-shell">
        <div className="section-intro">
          <p className="label">Practical outcomes</p>
          <h2 id="profile-heading" className="section-title">由實際問題，<br />做到有依據嘅成果。</h2>
          <p className="section-lead">企業開發同個人實作，分開交代。每個數字，都有自己嘅範圍。</p>
        </div>
        <div className="results-grid">
          <article className="result"><p className="result__value">60<span> → </span>85%+</p><h3>關鍵模組單元測試覆蓋率</h3><p>於 IBM 參與 HKTDC 平台開發，將相關模組由約 60% 提升至 85%+。</p><p className="evidence-note">IBM · 2025 年 4–8 月 · 個人工作成果陳述</p></article>
          <article className="result"><p className="result__value">10+<span> 小時／週</span></p><h3>減少重複招聘工作</h3><p>透過 WhatsApp Chrome extension 同 Python JobsDB 系統，處理重複操作。</p><p className="evidence-note">Venturenix Lab · 2023 年 6 月–2025 年 3 月 · 個人工作成果陳述</p></article>
          <article className="result"><p className="result__value">40<span>%</span></p><h3>行政處理時間減幅</h3><p>以 Spring Boot＋React 建立 Job Opening System，加入自動合約生成功能。</p><p className="evidence-note">Venturenix Lab · 2023 年 6 月–2025 年 3 月 · 個人工作成果陳述</p></article>
        </div>
      </div>
    </section>
  );
}
