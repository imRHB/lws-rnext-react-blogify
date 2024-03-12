export default function AppButton({
    label,
    type = "button",
    variant,
    onAction,
}) {
    if (variant === "primary")
        return (
            <button
                type={type}
                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
                onClick={onAction}
            >
                {label}
            </button>
        );

    if (variant === "danger")
        return (
            <button
                type={type}
                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onAction}
            >
                {label}
            </button>
        );

    return (
        <button
            type={type}
            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-200 rounded-md shadow-sm bg-slate-900 ring-1 ring-inset ring-slate-800 hover:bg-slate-950 sm:mt-0 sm:w-auto"
            onClick={onAction}
        >
            {label}
        </button>
    );
}
