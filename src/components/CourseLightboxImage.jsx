export default function CourseLightboxImage({ src, alt, onOpen }) {
  return (
    <button type="button" className="course-lightbox-trigger" onClick={onOpen} aria-label={`放大：${alt}`}>
      <img src={src} alt={alt} />
    </button>
  );
}
