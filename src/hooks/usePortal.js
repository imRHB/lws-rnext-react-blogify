import { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function usePortal(containerId) {
    const rootElemRef = useRef(null);

    const createPortalRoot = useCallback(() => {
        // Check if the container element already exists
        const existingRoot = document.getElementById(containerId);
        if (existingRoot) {
            return existingRoot;
        }

        // If not, create a new div element
        const rootElem = document.createElement("div");
        rootElem.setAttribute("id", containerId);

        return rootElem;
    }, [containerId]);

    useEffect(() => {
        rootElemRef.current = createPortalRoot();
        document.body.appendChild(rootElemRef.current);

        return () => {
            document.body.removeChild(rootElemRef.current);
        };
    }, [createPortalRoot]);

    // Function to render children inside the portal
    return (children) => ReactDOM.createPortal(children, rootElemRef.current);
}
