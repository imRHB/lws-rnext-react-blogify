import React from "react";

import getFirstChar from "../../lib/getFirstChar";

export default function Avatar({ name, imgSrc, size }) {
    const charAvatar = getFirstChar(name);

    return (
        <React.Fragment>
            {imgSrc ? (
                <img
                    className={`${
                        size === "large" ? "size-32" : "size-8"
                    } rounded-full`}
                    src={imgSrc}
                    alt="lws"
                />
            ) : (
                <div
                    className={`${
                        size === "large" ? "size-32 text-5xl" : "text-base"
                    } text-white bg-indigo-600 avatar-img`}
                >
                    <span>{charAvatar}</span>
                </div>
            )}
        </React.Fragment>
    );
}
