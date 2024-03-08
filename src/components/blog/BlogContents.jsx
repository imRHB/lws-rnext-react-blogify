import { Link } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import { getTimestamp } from "../../lib/getTimestamp";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";

export default function BlogContents({ blog }) {
    const { state } = useProfile();

    const { author, title, content, createdAt, likes, tags, thumbnail } = blog;
    const tagList = tags?.split(",");

    const isAuthorLoggedIn = state?.user?.id === author?.id;

    return (
        <article className="container py-8 text-center">
            <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>

            <div className="flex items-center justify-center gap-4 my-4">
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
                                state?.user && state?.user?.id === author?.id
                                    ? `${
                                          import.meta.env.VITE_SERVER_BASE_URL
                                      }/uploads/avatar/${state?.user?.avatar}`
                                    : `${
                                          import.meta.env.VITE_SERVER_BASE_URL
                                      }/uploads/avatar/${author?.avatar}`
                            }
                        />
                    </Link>
                    <h5 className="text-sm text-slate-500">
                        <Link
                            to={
                                isAuthorLoggedIn
                                    ? "/profile"
                                    : `/profile/${author?.id}`
                            }
                        >
                            {author?.firstName} {author?.lastName}
                        </Link>
                    </h5>
                </div>
                <span className="text-sm text-slate-700 dot">
                    {createdAt && getTimestamp(createdAt)}
                </span>
                <span className="text-sm text-slate-700 dot">
                    {likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
                </span>
            </div>

            {thumbnail && (
                <img
                    className="object-cover w-full mx-auto md:w-8/12 h-80 md:h-96"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${thumbnail}`}
                    alt=""
                />
            )}

            <ul className="flex flex-wrap items-center justify-center gap-3 my-4 text-slate-300">
                {tagList?.map((tag) => (
                    <Badge key={tag} label={tag} />
                ))}
            </ul>

            <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                {content}
            </div>
        </article>
    );
}
