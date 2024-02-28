import { Link } from "react-router-dom";

export default function AppLink({ href, label, variant }) {
    return (
        <Link
            to={href}
            className={`${
                variant === "primary"
                    ? "px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                    : "text-indigo-600 hover:underline"
            }`}
        >
            {label}
        </Link>
    );
}
