import { createPortal } from "react-dom";

export default function Portal({ children }) {
    const mountElement = document.getElementById("root");

    return createPortal(children, mountElement);
}
