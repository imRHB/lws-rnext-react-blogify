import { Link } from "react-router-dom";

import { actions } from "../actions";
import useSearch from "../hooks/useSearch";
import { getTimestamp } from "../lib/getTimestamp";

export default function SearchResultItem({ blog }) {
    const { dispatch } = useSearch();

    function handleSearchItemClick() {
        dispatch({
            type: actions.search.SEARCH_QUERY,
            payload: {
                query: "",
            },
        });

        dispatch({
            type: actions.search.SEARCH_BLOGS,
            payload: {
                blogs: [],
            },
        });
    }

    return (
        <div>
            <Link
                to={`/blogs/${blog?.id}`}
                className="flex gap-6 py-2"
                onClick={handleSearchItemClick}
            >
                <img
                    className="object-cover rounded-lg w-60"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${blog?.thumbnail}`}
                    alt={blog?.title}
                />
                <div className="mt-2">
                    <div>
                        <h3 className="text-xl font-bold text-slate-300">
                            {blog?.title}
                        </h3>

                        <p className="mt-1 mb-6 text-sm text-slate-500">
                            {blog?.content?.slice(0, 200)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center text-xs text-slate-700">
                            <span>{getTimestamp(blog?.createdAt)}</span>
                        </div>
                        <div className="px-2 py-1 text-sm text-slate-700">
                            <span>
                                {blog?.likes?.length}{" "}
                                {blog?.likes?.length > 1 ? "Likes" : "Like"}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
