import { LINKS } from "../constants/links";

export default function CourseContactCta() {
  return (
    <div className="course-contact" id="course-contact">
      <span className="divider">+</span>
      <h3 className="course-contact__title">想查詢課程或合作？</h3>
      <span className="divider">+</span>
      <p className="course-contact__lead">
        歡迎學生、家長、學校、企業或機構查詢 AI 課程、Vibe Coding 工作坊同客製培訓。可以先簡單講背景、對象同目標，我再建議合適形式同節奏。
      </p>
      <ul className="course-list course-contact__checklist">
        <li>對象：小學 / 中學 / 大人 / 企業團隊</li>
        <li>想了解：試堂、系列課、12 小時班或全日 workshop</li>
        <li>可準備：人數、程度、想解決嘅問題同偏好時間</li>
      </ul>
      <div className="course-contact__actions">
        <a className="btn-outline" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
          {LINKS.instagramLabel}
        </a>
        <a className="btn-outline" href={LINKS.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="course-contact__link" href="#course-formats">
          了解培訓形式
        </a>
      </div>
      <span className="divider">+</span>
    </div>
  );
}
