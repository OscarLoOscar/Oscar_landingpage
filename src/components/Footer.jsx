import { LINKS } from "../constants/links";

export default function Footer() {
  return <footer className="site-footer"><div className="section-shell site-footer__inner"><p>© 2026 Oscar</p><nav aria-label="頁尾連結"><a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">InnoTrend Education ↗</a><a href="#top">返回頂部 ↑</a></nav></div></footer>;
}
