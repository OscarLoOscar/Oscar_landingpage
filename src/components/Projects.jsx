export default function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="section-shell">
        <div className="section-intro">
          <span className="divider">+</span>
          <p className="label">GitHub Highlights</p>
          <span className="divider">+</span>
          <h2 id="projects-heading" className="section-title">
            Technical projects that reflect how I solve problems.
          </h2>
          <span className="divider">+</span>
          <p className="section-lead">
            Selected projects that emphasize independent execution: solo-built products, solo-owned
            automation, and systems I still maintain for real users and clients.
          </p>
        </div>

        <div className="projects__grid">
          <article className="card">
            <p className="card__meta">Django · E-commerce · Solo Build</p>
            <h3 className="card__title">
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>{" "}
              E-Commerce Website
            </h3>
            <p className="card__text">
              Independently designed and developed an e-commerce website in Django for{" "}
              <a href="https://sally-sells.com" target="_blank" rel="noopener noreferrer">
                Sally-sells.com
              </a>
              , covering the full development flow as a one-person builder rather than as one
              contributor on a team.
            </p>
            <p className="card__text">
              The project is not just a past build. I am still handling ongoing maintenance, which
              means taking responsibility for stability, fixes, and keeping the system usable over time.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Django</span>
              <span className="tag">E-commerce</span>
              <span className="tag">Solo Build</span>
              <span className="tag">Maintenance</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">Freelance · Client Work · Solo Delivery</p>
            <h3 className="card__title">Dimerco Freelance Work</h3>
            <p className="card__text">
              An ongoing freelance engagement handled independently, showing that I can take on
              external client work with direct ownership over communication, implementation, and
              delivery.
            </p>
            <p className="card__text">
              This work highlights trust, accountability, and the ability to support real business
              needs outside a fixed in-house team structure.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Freelance</span>
              <span className="tag">Client Delivery</span>
              <span className="tag">Ownership</span>
              <span className="tag">Ongoing</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">Python · Crawling · Solo Build</p>
            <h3 className="card__title">
              <a
                href="https://github.com/OscarLoOscar/crawl_JobsDB_v9"
                target="_blank"
                rel="noopener noreferrer"
              >
                JobsDB Crawling System
              </a>
            </h3>
            <p className="card__text">
              A one-person{" "}
              <a
                href="https://github.com/OscarLoOscar/crawl_JobsDB_v9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Python system
              </a>{" "}
              built to crawl JobsDB data for repeatable market research and recruitment support
              workflows.
            </p>
            <p className="card__text">
              The focus was not only data extraction, but building something practical enough to save
              time and support operational decisions in a repeatable way.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Python</span>
              <span className="tag">Crawler</span>
              <span className="tag">Automation</span>
              <span className="tag">Solo Build</span>
            </div>
          </article>

          <article className="card">
            <p className="card__meta">Chrome Extension · WhatsApp · Solo Build</p>
            <h3 className="card__title">
              <a
                href="https://github.com/OscarLoOscar/whatsapp_call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome Send WhatsApp Extension
              </a>
            </h3>
            <p className="card__text">
              A{" "}
              <a
                href="https://github.com/OscarLoOscar/whatsapp_call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome extension
              </a>{" "}
              developed independently to streamline WhatsApp sending workflows and reduce repetitive
              manual messaging tasks.
            </p>
            <p className="card__text">
              It reflects the way I approach tools: identify the bottleneck, automate the pain point,
              and deliver something lightweight that solves a real operational problem.
            </p>
            <div className="tag-list" aria-label="Technologies used">
              <span className="tag">Chrome Extension</span>
              <span className="tag">WhatsApp</span>
              <span className="tag">Automation</span>
              <span className="tag">Solo Build</span>
            </div>
          </article>
        </div>

        <div className="projects__cta">
          <a
            className="btn-outline"
            href="https://github.com/OscarLoOscar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
