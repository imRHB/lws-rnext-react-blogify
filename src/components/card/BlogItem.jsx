import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import Badge from "../ui/Badge";

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
                <ul className="flex flex-wrap gap-3 my-2 text-slate-500">
                    {tagList.map((tag) => (
                        <Badge key={tag} label={`#${tag.trim()}`} size="xs" />
                    ))}
                </ul>
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
