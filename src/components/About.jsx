import { assetUrl } from "../utils/assetUrl";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="about-split">
        <div className="about-split__content">
          <span className="divider">+</span>
          <p className="label">About</p>
          <span className="divider">+</span>
          <h2 id="about-heading" className="section-title">
            Oscar Lo
          </h2>
          <span className="divider">+</span>
          <div className="about-text">
            <p>
              I write software with a strong bias toward practical outcomes: faster operations,
              clearer workflows, and systems that can scale without becoming difficult to maintain.
            </p>
            <p>
              Alongside professional development work, I also teach and mentor. At Venturenix Lab I
              led daily technical drills for junior developers, and today I continue that educator
              mindset through AI courses for students and adults.
            </p>
            <p>What makes me different is the combination of engineering and communication:</p>
            <ul>
              <li>Enterprise backend delivery at IBM</li>
              <li>Startup automation and full-stack execution at Venturenix Lab</li>
              <li>A successful transition from service leadership into software engineering</li>
              <li>Hands-on teaching experience across junior developers, students, and adult learners</li>
            </ul>
          </div>
          <span className="divider">+</span>
          <div className="about-actions">
            <a
              className="btn-outline"
              href="https://github.com/OscarLoOscar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <span className="divider">+</span>
        </div>
        <div
          className="about-split__visual"
          style={{ backgroundImage: `url('${assetUrl("assets/images/02_linkin.png")}')` }}
          aria-hidden="true"
        ></div>
      </div>
    </section>
  );
}
