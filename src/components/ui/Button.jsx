export default function Button({ label, type = "button" }) {
    return (
        <button
            type={type}
            className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
            {label}
        </button>
    );
}
