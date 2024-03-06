import Modal from "./Modal";

export default function SearchModal({ isOpen, closeModal }) {
    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <div>
                <h2 className="mb-4 text-lg font-bold">Modal Content</h2>
                <p>This is the content of the modal.</p>
            </div>

            <button onClick={closeModal}>Close</button>
        </Modal>
    );
}
