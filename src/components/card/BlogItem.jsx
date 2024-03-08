import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";

export default function BlogItem({ blog, category }) {
    const { state } = useProfile();

    const tagList = blog.tags?.split(",");
    const isAuthorLoggedIn = state?.user?.id === blog?.author?.id;

    return (
        <article>
            <Link to={`/blogs/${blog.id}`}>
                <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                    {blog.title}
                </h3>
            </Link>

            {category === "favorite" && tagList.length > 0 ? (
                <p className="flex flex-wrap gap-2 text-sm text-slate-600">
                    {tagList.map((tag) => (
                        <Tag key={tag} tag={tag.trim()} />
                    ))}
                </p>
            ) : (
                <p className="text-sm text-slate-600">
                    by{" "}
                    <Link
                        to={
                            isAuthorLoggedIn
                                ? "/profile"
                                : `/profile/${blog?.author?.id}`
                        }
                    >
                        {blog.author.firstName} {blog.author.lastName}
                    </Link>{" "}
                    <span>·</span> {blog.likes.length}{" "}
                    {blog.likes.length > 1 ? "Likes" : "Like"}
                </p>
            )}
        </article>
    );
}

function Tag({ tag }) {
    return <span className="px-2 py-1 rounded-full bg-slate-900">#{tag}</span>;
}
