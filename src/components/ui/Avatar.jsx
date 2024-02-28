import React from "react";
import { Link } from "react-router-dom";

import getFirstChar from "../../lib/getFirstChar";

export default function Avatar({ name, imgSrc }) {
    const charAvatar = getFirstChar(name);

    return (
        <React.Fragment>
            {imgSrc ? (
                <Link to="/">
                    <img
                        className="rounded-full size-10"
                        src={imgSrc}
                        alt="lws"
                    />
                </Link>
            ) : (
                <div className="text-white bg-indigo-600 avatar-img">
                    <span>{charAvatar}</span>
                </div>
            )}
        </React.Fragment>
    );
}
