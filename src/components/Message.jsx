import React from "react";

export default function Message({ title, description }) {
    return (
        <React.Fragment>
            <h3 className="text-3xl font-bold text-slate-400">{title}</h3>
            <p className="tracking-wider text-slate-300">{description}</p>
        </React.Fragment>
    );
}
