import { useEffect } from "react";
import { assetUrl } from "../utils/assetUrl";

export default function Lightbox({ images, index, onClose, onChange }) {
  const current = images[index];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, index, onChange, onClose]);

  if (!current) {
    return null;
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt}>
      <button type="button" className="lightbox__backdrop" onClick={onClose} aria-label="關閉" />
      <div className="lightbox__content">
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="關閉">
          ×
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => onChange((index - 1 + images.length) % images.length)}
              aria-label="上一張"
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => onChange((index + 1) % images.length)}
              aria-label="下一張"
            >
              ›
            </button>
          </>
        )}
        <img className="lightbox__image" src={assetUrl(current.src)} alt={current.alt} />
        <p className="lightbox__caption">
          {current.alt}
          {images.length > 1 && (
            <span className="lightbox__count">
              {" "}
              ({index + 1}/{images.length})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
