export default function Field({ children, label, htmlFor, error }) {
    return (
        <div className="space-y-2">
            <div
                className={`${
                    label ? "justify-between" : "justify-end"
                } flex items-center gap-4`}
            >
                {label && (
                    <label htmlFor={htmlFor} className="block text-slate-200">
                        {label}
                    </label>
                )}
                {!!error && (
                    <p className="text-sm text-red-500">{error.message}</p>
                )}
            </div>

            {children}
        </div>
    );
}
