import { useEffect } from "react";

import { actions } from "../../actions";
import useBlog from "../../hooks/useBlog";
import useBlogs from "../../hooks/useBlogs";
import BlogCard from "../card/BlogCard";

export default function MainBlogs() {
    const { blogs, hasMore, loaderRef } = useBlogs();

    const { state, dispatch } = useBlog();

    /* worked */
    /* useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.FETCH_ALL_BLOGS,
                        payload: {
                            blogs: response.data.blogs,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchBlogs();
    }, [dispatch]); */

    useEffect(() => {
        dispatch({
            type: actions.blog.FETCH_BLOGS_INFINITELY,
            payload: {
                blogs,
            },
        });
    }, [blogs, dispatch]);

    return (
        <main className="space-y-5 md:col-span-5">
            {state?.blogs.length > 0 &&
                state?.blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}

            {hasMore ? (
                <div
                    ref={loaderRef}
                    className="flex items-center justify-center h-24 bg-slate-900"
                >
                    <p className="text-xl font-bold">fetching blogs...</p>
                </div>
            ) : (
                <div className="flex items-center justify-center h-24 bg-slate-900">
                    <p className="text-xl font-bold">No more blogs!</p>
                </div>
            )}
        </main>
    );
}
