export default function AlertModalLayout({ isOpen, children }) {
    return isOpen ? (
        <section className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 place-items-center bg-slate-800/50 backdrop-blur-sm">
            {children}
        </section>
    ) : null;
}
