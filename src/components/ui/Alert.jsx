import Portal from "../Portal";
import AlertModalLayout from "../layout/AlertModalLayout";

export default function Alert({ isOpen, children }) {
    return (
        <Portal>
            <AlertModalLayout isOpen={isOpen}>{children}</AlertModalLayout>
        </Portal>
    );
}
