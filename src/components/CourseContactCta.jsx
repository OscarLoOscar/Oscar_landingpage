import { LINKS } from "../constants/links";

export default function CourseContactCta() {
  return (
    <section className="contact section-pad" id="course-contact" aria-labelledby="contact-heading">
      <div className="section-shell"><p className="label">Let’s work on something useful</p><h2 className="section-title" id="contact-heading">由你想解決嘅<br />一個問題開始。</h2><p className="section-lead">工程合作、企業培訓，或者學校課程。簡單講背景、對象同目標，我哋再討論合適嘅做法。</p>
        <p className="contact__note">課程查詢可附人數、程度、想處理嘅任務及偏好時間。</p><a className="text-link" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">透過 Instagram 聯絡宏業創科教育 ↗</a>
      </div>
    </section>
  );
}
