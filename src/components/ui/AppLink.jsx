import { Link } from "react-router-dom";

export default function AppLink({ href, label, variant }) {
    return (
        <Link
            to={href}
            className={`${
                variant === "primary"
                    ? "bg-indigo-600 ring-indigo-700 hover:bg-indigo-700"
                    : "bg-slate-900 ring-slate-800 hover:bg-slate-950"
            } px-6 py-2 transition-all duration-200 rounded-md md:py-3 text-white ring-1 ring-inset`}
        >
            {label}
        </Link>
    );
}
