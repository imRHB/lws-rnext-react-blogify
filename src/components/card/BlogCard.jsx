import { useState } from "react";
import { Link } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import { getTimestamp } from "../../lib/getTimestamp";
import BlogItemActions from "../blog/BlogItemActions";
import Avatar from "../ui/Avatar";

import dotsIcon from "/assets/icons/3dots.svg";

export default function BlogCard({ blog }) {
    const [showActions, setShowActions] = useState(false);

    const { state } = useProfile();
    const { author, title, content, createdAt, id, likes, thumbnail } = blog;

    const isAuthorLoggedIn = state?.user?.id === author?.id;
    const isAvatarAvailable = author?.avatar;

    function handleBlogActions(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        setShowActions((prevState) => !prevState);
    }

    return (
        <Link to={`/blogs/${id}`} className="blog-card">
            <img
                className="blog-thumb"
                src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/blog/${thumbnail}`}
                alt={title}
            />

            <div className="relative flex flex-col justify-between my-2">
                <div>
                    <h3 className="text-xl text-slate-300 lg:text-2xl">
                        {title}
                    </h3>
                    <p className="mt-1 mb-6 text-base text-slate-500">
                        {content.slice(0, 200)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 capitalize">
                        <Link
                            to={
                                isAuthorLoggedIn
                                    ? "/profile"
                                    : `/profile/${author?.id}`
                            }
                        >
                            <Avatar
                                name={author?.firstName}
                                imgSrc={
                                    isAuthorLoggedIn
                                        ? isAvatarAvailable
                                            ? `${
                                                  import.meta.env
                                                      .VITE_SERVER_BASE_URL
                                              }/uploads/avatar/${
                                                  state?.user?.avatar
                                              }`
                                            : null
                                        : isAvatarAvailable
                                        ? `${
                                              import.meta.env
                                                  .VITE_SERVER_BASE_URL
                                          }/uploads/avatar/${author?.avatar}`
                                        : null
                                }
                            />
                        </Link>

                        <div>
                            <h5 className="text-sm text-slate-500">
                                <Link
                                    to={
                                        isAuthorLoggedIn
                                            ? "/profile"
                                            : `/profile/${author?.id}`
                                    }
                                >
                                    {author.firstName} {author.lastName}
                                </Link>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{getTimestamp(createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 py-1 text-sm text-slate-700">
                        <span>
                            {likes.length} {likes.length > 1 ? "Likes" : "Like"}
                        </span>
                    </div>
                </div>

                {state?.user?.id === author.id && (
                    <div className="absolute -top-1.5 -right-1.5">
                        <button
                            className="p-1.5 rounded-full hover:bg-slate-900"
                            onClick={handleBlogActions}
                        >
                            <img src={dotsIcon} alt="3dots of Action" />
                        </button>

                        {showActions && (
                            <BlogItemActions
                                blogId={id}
                                title={title}
                                setShowActions={setShowActions}
                            />
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
