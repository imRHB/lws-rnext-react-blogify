import { Link } from "react-router-dom";

export default function AppLink({ href, label, variant }) {
    if (variant === "primary")
        return (
            <Link
                to={href}
                className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md ring-indigo-700 hover:bg-indigo-700 md:py-3 ring-1 ring-inset"
            >
                {label}
            </Link>
        );

    if (variant === "base")
        return (
            <Link
                to={href}
                className="px-6 py-2 text-white transition-all duration-200 rounded-md md:py-3 ring-1 ring-inset bg-slate-900 ring-slate-800 hover:bg-slate-950"
            >
                {label}
            </Link>
        );

    return (
        <Link to={href} className="text-indigo-400 hover:text-indigo-500">
            {label}
        </Link>
    );
}
