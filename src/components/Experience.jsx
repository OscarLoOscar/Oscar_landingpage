export default function Experience() {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-heading">
      <div className="section-shell">
        <div className="section-intro">
          <span className="divider">+</span>
          <p className="label">Professional Experience</p>
          <span className="divider">+</span>
          <h2 id="experience-heading" className="section-title">
            From startup execution to enterprise delivery.
          </h2>
          <span className="divider">+</span>
          <p className="section-lead">
            Experience across enterprise engineering, startup execution, ongoing client maintenance,
            and freelance delivery, with a blend of backend development, automation, and teaching.
          </p>
        </div>

        <div className="experience__grid">
          <article className="card card--feature">
            <p className="card__meta">Solo · Sally-sells.com · Sep 2025 - Present</p>
            <h3 className="card__title">Independent e-commerce build and long-term maintenance.</h3>
            <ul className="card__list">
              <li>
                Independently designed and developed{" "}
                <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                  Sally-sells.com
                </a>
                , a Django e-commerce website covering the full solo development flow from
                implementation to production deployment.
              </li>
              <li>
                Handle ongoing maintenance for the live store—fixes, updates, and keeping the system
                stable and usable for real customers over time.
              </li>
              <li>
                Own the full product lifecycle as a one-person builder: scoping, backend delivery,
                deployment, and post-launch support without a team buffer.
              </li>
            </ul>
          </article>

          <article className="card card--feature">
            <p className="card__meta">Freelance · Dimerco · May 2026 - Present</p>
            <h3 className="card__title">Independent client delivery and long-term technical ownership.</h3>
            <ul className="card__list">
              <li>
                Handle freelance development work independently for Dimerco, with direct ownership
                over delivery, communication, and implementation.
              </li>
              <li>
                Write and maintain SQL queries against the company&apos;s internal database to support
                data extraction, reporting, and operational workflows.
              </li>
              <li>
                Build automation that logs into internal web portals and internal database systems to
                streamline repetitive access and data-handling tasks.
              </li>
              <li>
                Develop OCR-based workflows to capture and process document data, plus C# (.cs)
                implementation for client-side tooling and integration work.
              </li>
            </ul>
          </article>

          <article className="card card--feature">
            <p className="card__meta">IBM · Analyst Programmer · Apr 2025 - Aug 2025</p>
            <h3 className="card__title">Enterprise backend systems for HKTDC platforms.</h3>
            <ul className="card__list">
              <li>
                Contributed to eMP 2.0, EOP, and MyHKTDC, building and improving scalable
                microservices for customer-facing enterprise systems.
              </li>
              <li>
                Enhanced calendar-service and enquiry-service, and refactored batch notification
                modules for WhatsApp, SMS, and WeChat delivery.
              </li>
              <li>
                Raised unit test coverage from roughly 60% to 85%+ and resolved critical SonarQube
                issues to reduce technical debt.
              </li>
              <li>
                Ran K6 scenario-based performance testing, integrated reCAPTCHA Enterprise, and
                supported AWS production environments for stable operations.
              </li>
            </ul>
          </article>

          <article className="card card--feature">
            <p className="card__meta">Venturenix Lab · Programmer · Jun 2023 - Mar 2025</p>
            <h3 className="card__title">Automation, full-stack delivery, and teaching-driven leadership.</h3>
            <ul className="card__list">
              <li>
                Built internal automation tools including a WhatsApp Chrome extension and a Python-based
                JobsDB system, cutting repetitive recruitment work by more than 10 hours per week.
              </li>
              <li>
                Developed a Job Opening System with Spring Boot and React, including auto-generated
                contracts that reduced administrative processing time by 40%.
              </li>
              <li>Migrated WordPress platforms to Cloudways, improving SEO performance and site speed.</li>
              <li>
                Led daily LeetCode drills for junior developers and helped organize the 2024 MasterCode
                Java Competition, strengthening the team&apos;s learning culture.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
