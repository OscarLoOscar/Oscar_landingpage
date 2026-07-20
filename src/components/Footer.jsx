import { useState } from "react";
import { LINKS } from "../constants/links";

const TECH_STACK = [
  {
    name: "Java",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  },
  {
    name: "Spring Boot",
    icon: "https://camo.githubusercontent.com/28abd5ef347f4db16b2f3d39b2e8fd64269f747f987a65b1fa07fcad150a4f6d/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f737072696e67696f2f737072696e67696f2d69636f6e2e737667",
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  },
  {
    name: "Django",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redis",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Modern Web (HTML/CSS/JS, React ecosystem)",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    name: "Android",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg",
  },
];

export default function Footer() {
  const [techStackOpen, setTechStackOpen] = useState(false);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <nav className="footer-nav" aria-label="Footer">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="footer-dot" aria-hidden="true">
            ·
          </span>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
            宏業創科教育
          </a>
          <span className="footer-dot" aria-hidden="true">
            ·
          </span>
          <a href="#course-contact">課程查詢</a>
          <span className="footer-dot" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            className="footer-link-btn"
            id="tech-stack-toggle"
            aria-expanded={techStackOpen}
            aria-controls="tech-stack-panel"
            onClick={() => setTechStackOpen((open) => !open)}
          >
            Tech Stack
          </button>
        </nav>
        <div className="tech-stack" id="tech-stack-panel" hidden={!techStackOpen}>
          <p className="tech-stack__label">Tech Stack</p>
          <ul className="tech-stack__list">
            {TECH_STACK.map((item) => (
              <li key={item.name}>
                <img src={item.icon} alt={item.name} width="40" height="40" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="copyright">© 2026 Oscar Lo. All rights reserved.</p>
      </div>
    </footer>
  );
}
