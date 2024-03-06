import { useState } from "react";

import AppLayout from "../components/AppLayout";
import Modal from "../components/Modal";
import FavoriteBlogs from "../components/blog/FavoriteBlogs";
import MainBlogs from "../components/blog/MainBlogs";
import PopularBlogs from "../components/blog/PopularBlogs";

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-center">
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={openModal}
                >
                    Open Modal
                </button>
                {/* {isOpen && <SearchModal isOpen={isOpen} onClose={closeModal} />} */}
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <div>
                        <h2 className="mb-4 text-lg font-bold">
                            Modal Content
                        </h2>
                        <p>This is the content of the modal.</p>
                    </div>
                </Modal>
            </div>

            <section className="container">
                <section className="grid grid-cols-1 gap-4 md:grid-cols-7">
                    <MainBlogs />

                    <aside className="w-full h-full space-y-5 md:col-span-2">
                        <PopularBlogs />
                        <FavoriteBlogs />
                    </aside>
                </section>
            </section>
        </AppLayout>
    );
}
