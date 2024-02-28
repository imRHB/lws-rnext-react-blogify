import React from "react";

export default function Field({ children, label, htmlFor, error }) {
    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <label htmlFor={htmlFor} className="block">
                    {label}
                </label>
                {!!error && (
                    <p className="text-sm text-red-500">{error.message}</p>
                )}
            </div>

            {children}
        </React.Fragment>
    );
}
