import React from "react";

import usePortal from "../../hooks/usePortal";
import AlertModalLayout from "../layout/AlertModalLayout";

export default function Alert({ isOpen, children }) {
    const portal = usePortal("action-portal");

    return (
        <React.Fragment>
            {isOpen &&
                portal(
                    <AlertModalLayout isOpen={isOpen}>
                        {children}
                    </AlertModalLayout>
                )}
        </React.Fragment>
    );
}
