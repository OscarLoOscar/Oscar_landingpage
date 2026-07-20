export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <p className="hero__eyebrow">Backend Engineer · Analyst Programmer · Technical Educator</p>
        <h4 className="hero__subtitle">
          由服務業及團隊管理轉型至軟件工程，主力 Java · Spring Boot · Python · Django 後端，配合 React、Docker、AWS 交付可上線系統，並拓展 Android 與 AI 應用教學。
        </h4>
        <p className="hero__lead">
          Backend-first engineer across Java, Spring Boot, Python, and Django, with hands-on
          experience in PostgreSQL, MySQL, Redis, Docker, and AWS. I build and maintain production
          systems—from enterprise microservices to solo Django and React products—and teach others
          to apply AI and modern web tools in real workflows.
        </p>
        <div className="hero__actions">
          <a
            className="btn-outline btn-outline--light"
            href="https://github.com/OscarLoOscar"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a className="hero__link" href="#experience">
            Professional Experience
          </a>
        </div>
        <ul className="hero__stats" aria-label="Career highlights">
          <li>
            <span className="hero__stat-value">85%+</span>
            <span className="hero__stat-label">test coverage achieved on key IBM modules</span>
          </li>
          <li>
            <span className="hero__stat-value">4+ solo builds</span>
            <span className="hero__stat-label">
              from e-commerce and crawler systems to Chrome extensions
            </span>
          </li>
          <li>
            <span className="hero__stat-value">Live clients</span>
            <span className="hero__stat-label">
              ongoing maintenance for{" "}
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>{" "}
              and freelance delivery
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
