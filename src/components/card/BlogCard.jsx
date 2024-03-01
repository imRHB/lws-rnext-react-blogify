import { Link } from "react-router-dom";

import Avatar from "../ui/Avatar";

import blogThumbnail from "/assets/blogs/React-Roadmap.jpg";

export default function BlogCard({ blog }) {
    const { title, content, id } = blog;

    return (
        <Link to={`/blogs/${id}`} className="blog-card">
            <img className="blog-thumb" src={blogThumbnail} alt="" />

            <div className="relative mt-2">
                <a href="./single-blog.html">
                    <h3 className="text-xl text-slate-300 lg:text-2xl">
                        <a href="./single-blog.html">{title}</a>
                    </h3>
                </a>
                <p className="mt-1 mb-6 text-base text-slate-500">{content}</p>

                {/* <!-- Meta Informations --> */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 capitalize">
                        {/* <div className="text-white bg-indigo-600 avatar-img">
                            <span className="">S</span>
                        </div> */}

                        <Avatar
                            name="Akash Ahmed"
                            imgSrc="https://i.pravatar.cc/80"
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
                    {/* <BlogItemActions /> */}
                </div>
                {/* <!-- action dot ends --> */}
            </div>
        </Link>
    );
}
