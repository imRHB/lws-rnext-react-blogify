import { useEffect } from "react";

export default function ModalLayout({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEscape);
        } else {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    return isOpen ? (
        <section className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 place-items-center bg-slate-800/50 backdrop-blur-sm">
            {children}
        </section>
    ) : null;
}
