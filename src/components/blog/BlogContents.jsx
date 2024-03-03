import useUserProfile from "../../hooks/useUserProfile";
import { getTimestamp } from "../../lib/getTimestamp";
import Avatar from "../ui/Avatar";

export default function BlogContents({ blog }) {
    const { user } = useUserProfile();

    const { author, title, content, createdAt, likes, tags, thumbnail } = blog;
    const tagList = tags?.split(",");

    return (
        <article className="container py-8 text-center">
            <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>

            <div className="flex items-center justify-center gap-4 my-4">
                <div className="flex items-center space-x-2 capitalize">
                    <Avatar
                        name={author?.firstName}
                        imgSrc={
                            user && user?.id === author?.id
                                ? `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${user?.avatar}`
                                : `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${author?.avatar}`
                        }
                    />
                    <h5 className="text-sm text-slate-500">
                        {author?.firstName} {author?.lastName}
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

            <ul className="tags">
                {tagList?.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>

            <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                {content}
            </div>
        </article>
    );
}
