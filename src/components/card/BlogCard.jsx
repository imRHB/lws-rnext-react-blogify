import { Link } from "react-router-dom";

import Avatar from "../ui/Avatar";

import useUserProfile from "../../hooks/useUserProfile";
import blogThumbnail from "/assets/blogs/React-Roadmap.jpg";

export default function BlogCard({ blog }) {
    const { user } = useUserProfile();
    const { author, title, content, id, likes } = blog;

    return (
        <Link to={`/blogs/${id}`} className="blog-card">
            <img className="blog-thumb" src={blogThumbnail} alt="" />

            <div className="relative mt-2">
                <a href="./single-blog.html">
                    <h3 className="text-xl text-slate-300 lg:text-2xl">
                        <a href="./single-blog.html">{title}</a>
                    </h3>
                </a>
                <p className="mt-1 mb-6 text-base text-slate-500">
                    {content.slice(0, 200)}
                </p>

                {/* <!-- Meta Informations --> */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 capitalize">
                        {/* <div className="text-white bg-indigo-600 avatar-img">
                            <span className="">S</span>
                        </div> */}

                        <Avatar
                            name={author.firstName}
                            imgSrc={
                                user?.id === author.id
                                    ? `${
                                          import.meta.env.VITE_SERVER_BASE_URL
                                      }/uploads/avatar/${user?.avatar}`
                                    : `${
                                          import.meta.env.VITE_SERVER_BASE_URL
                                      }/uploads/avatar/${author.avatar}`
                            }
                        />

                        <div>
                            <h5 className="text-sm text-slate-500">
                                <a href="./profile.html">
                                    {author.firstName} {author.lastName}
                                </a>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>June 28, 2018</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 py-1 text-sm text-slate-700">
                        <span>
                            {likes.length} {likes.length > 1 ? "Likes" : "Like"}
                        </span>
                    </div>
                </div>

                {/* <!-- action dot --> */}
                {user?.id === author.id && (
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
                )}
            </div>
        </Link>
    );
}
