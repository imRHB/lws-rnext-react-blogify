import { Link } from "react-router-dom";

import { actions } from "../../actions";
import useSearch from "../../hooks/useSearch";
import { getTimestamp } from "../../lib/getTimestamp";

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
        <div className="py-4">
            <Link
                to={`/blogs/${blog?.id}`}
                className="flex flex-col items-center gap-6 rounded-md lg:flex-row group"
                onClick={handleSearchItemClick}
            >
                <img
                    className="object-cover rounded-md aspect-video max-h-36"
                    src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${blog?.thumbnail}`}
                    alt={blog?.title}
                />

                <div className="flex flex-col justify-between my-2 mr-3">
                    <div>
                        <h3 className="text-xl font-bold text-slate-300">
                            {blog?.title}
                        </h3>
                        <p className="mt-1 mb-6 text-sm text-slate-500">
                            {blog?.content?.slice(0, 160)}
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
