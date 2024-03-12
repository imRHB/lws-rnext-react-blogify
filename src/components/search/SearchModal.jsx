import Portal from "../Portal";
import ModalLayout from "../layout/ModalLayout";

export default function SearchModal({ isOpen, closeModal }) {
    return (
        <Portal>
            <ModalLayout isOpen={isOpen} onClose={closeModal}>
                <section className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm">
                    <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
                        {/* <!-- Search --> */}
                        <div>
                            <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
                                Search for Your Desire Blogs
                            </h3>
                            <input
                                type="text"
                                placeholder="Start Typing to Search"
                                className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    <button onClick={closeModal}>Close</button>
                </section>
            </ModalLayout>
        </Portal>
    );
}
