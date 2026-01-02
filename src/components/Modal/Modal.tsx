import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.classList.add("modal-open");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css["modal-window"]} role="dialog" aria-modal="true">
        <button
          className={css["btn-exit"]}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
