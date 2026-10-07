export default function Profile() {
  return (
    <section className="profile" id="profile" aria-labelledby="profile-heading">
      <div className="section-shell">
        <div className="section-intro">
          <span className="divider">+</span>
          <p className="label">Professional Summary</p>
          <span className="divider">+</span>
          <h2 id="profile-heading" className="section-title">
            Practical backend engineering with an educator&apos;s mindset.
          </h2>
          <span className="divider">+</span>
          <p className="section-lead">
            Java and Python focused engineer with startup execution, enterprise delivery experience,
            and a strong track record of building tools that make teams faster and systems more
            reliable.
          </p>
        </div>

        <div className="profile__background"><p>由服務業及團隊管理轉型至軟件工程，主力 Java · Spring Boot · Python · Django 後端，配合 React、Docker、AWS 交付可上線系統，並拓展 Android 與 AI 應用教學。</p><p>Backend-first engineer across Java, Spring Boot, Python, and Django, with hands-on
          experience in PostgreSQL, MySQL, Redis, Docker, and AWS. I build and maintain production
          systems—from enterprise microservices to solo Django and React products—and teach others
          to apply AI and modern web tools in real workflows.</p><ul className="hero__stats" aria-label="Career highlights">
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
        </ul></div>
        <div className="profile__grid">
          <article className="card">
            <p className="card__meta">Summary</p>
            <h3 className="card__title">Enterprise delivery, automation, and product-minded execution.</h3>
            <p className="card__text">
              Analyst Programmer with hands-on experience delivering enterprise-grade backend systems
              at IBM and driving operational efficiency in startup environments. Specialized in Java
              with Spring Boot and Python with Django, with practical experience in microservices,
              AWS cloud operations, and high-performance API design.
            </p>
            <p className="card__text">
              I enjoy turning messy operational pain points into maintainable software, from backend
              services to internal automation, always with a bias toward measurable business value.
            </p>
          </article>

          <article className="card">
            <p className="card__meta">Core Strengths</p>
            <h3 className="card__title">Technical depth with clear communication.</h3>
            <ul className="card__list">
              <li>Java, Spring Boot, Python, Django, PostgreSQL, MySQL, Redis, and REST API design</li>
              <li>AWS operations, SonarQube remediation, K6 testing, and production reliability work</li>
              <li>Automation thinking that reduces repetitive work and improves team throughput</li>
              <li>Teaching, mentoring, and translating technical ideas for students and junior developers</li>
            </ul>
          </article>

          <article className="card">
            <p className="card__meta">Career Transition</p>
            <h3 className="card__title">A successful move from frontline operations into software engineering.</h3>
            <p className="card__text">
              Before entering tech, I spent a decade in service and team management roles. That path
              built strong ownership, client communication, and execution under pressure.
            </p>
            <p className="card__text">
              Today, that transition shows up in how I build software: practical, user-aware, and
              focused on solutions that teams can actually adopt and sustain.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
