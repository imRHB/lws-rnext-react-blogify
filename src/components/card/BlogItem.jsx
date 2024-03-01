import { Link } from "react-router-dom";

export default function BlogItem({ blog, category }) {
    const tagList = category === "favorite" && blog.tags.split(",");

    return (
        <article>
            <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                {blog.title}
            </h3>

            {category === "favorite" && tagList.length > 0 ? (
                <p className="space-x-1 text-sm text-slate-600">
                    {tagList.map((tag) => (
                        <Tag key={tag} tag={tag.trim()} />
                    ))}
                </p>
            ) : (
                <p className="text-sm text-slate-600">
                    by <Link to="/profile">Saad Hasan</Link> <span>·</span> 100
                    Likes
                </p>
            )}
        </article>
    );
}

function Tag({ tag }) {
    return <span>#{tag}</span>;
}
