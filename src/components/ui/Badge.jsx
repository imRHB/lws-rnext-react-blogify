export default function Badge({ label, size }) {
    return (
        <li
            className={`${
                size === "xs" ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"
            } uppercase transition-all duration-200 rounded-full bg-slate-900 ring-1 ring-slate-800 hover:bg-slate-950`}
        >
            {label}
        </li>
    );
}
