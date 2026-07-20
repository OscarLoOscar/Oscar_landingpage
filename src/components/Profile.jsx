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
