import { useEffect, useRef } from "react";
import { assetUrl } from "../utils/assetUrl";

export default function Lightbox({ images, index, onClose, onChange }) {
  const current = images[index];
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  if (!current) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={current.alt}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        onChange((index + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length);
      }}
    >
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
    </dialog>
  );
}
