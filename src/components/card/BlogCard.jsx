import Avatar from "../ui/Avatar";

export default function BlogCard() {
    return (
        <article className="blog-card">
            <img
                className="blog-thumb"
                src="./assets/blogs/React-Roadmap.jpg"
                alt=""
            />
            <div className="relative mt-2">
                <a href="./single-blog.html">
                    <h3 className="text-xl text-slate-300 lg:text-2xl">
                        <a href="./single-blog.html">React Roadmap in 2024</a>
                    </h3>
                </a>
                <p className="mt-1 mb-6 text-base text-slate-500">
                    Aenean eleifend ante maecenas pulvinar montes lorem et pede
                    dis dolor pretium donec dictum. Vici consequat justo enim.
                    Venenatis eget adipiscing luctus lorem.
                </p>

                {/* <!-- Meta Informations --> */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 capitalize">
                        {/* <div className="text-white bg-indigo-600 avatar-img">
                            <span className="">S</span>
                        </div> */}

                        <Avatar
                            name="Akash Ahmed"
                            // imgSrc="https://i.pravatar.cc/80"
                        />

                        <div>
                            <h5 className="text-sm text-slate-500">
                                <a href="./profile.html">Saad Hasan</a>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>June 28, 2018</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 py-1 text-sm text-slate-700">
                        <span>100 Likes</span>
                    </div>
                </div>

                {/* <!-- action dot --> */}
                <div className="absolute top-0 right-0">
                    <button>
                        <img
                            src="./assets/icons/3dots.svg"
                            alt="3dots of Action"
                        />
                    </button>

                    {/* <!-- Action Menus Popup --> */}
                    <div className="action-modal-container">
                        <button className="action-menu-item hover:text-lwsGreen">
                            <img src="./assets/icons/edit.svg" alt="Edit" />
                            Edit
                        </button>
                        <button className="action-menu-item hover:text-red-500">
                            <img src="./assets/icons/delete.svg" alt="Delete" />
                            Delete
                        </button>
                    </div>
                </div>
                {/* <!-- action dot ends --> */}
            </div>
        </article>
    );
}
