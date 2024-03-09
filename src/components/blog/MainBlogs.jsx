import { useEffect } from "react";

import { actions } from "../../actions";
import useBlog from "../../hooks/useBlog";
import useBlogs from "../../hooks/useBlogs";
import BlogCard from "../card/BlogCard";
import Message from "../Message";
import Spinner from "../ui/Spinner";

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

        return () => {
            dispatch({
                type: actions.blog.FETCH_BLOGS_INFINITELY,
                payload: {
                    blogs: [],
                },
            });
        };
    }, [blogs, dispatch]);

    return (
        <main className="space-y-5 md:col-span-5">
            {state?.blogs.length > 0 ? (
                state?.blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[40vh]">
                    <Message
                        title="No blogs found!"
                        description="No blogs found on the server, check back later."
                    />
                </div>
            )}

            {hasMore ? (
                <div
                    ref={loaderRef}
                    className="flex flex-col items-center justify-center gap-3 rounded-lg h-36 bg-slate-900/30"
                >
                    <Spinner />
                    <Message description="Fetching blogs" />
                </div>
            ) : (
                <div className="flex items-center justify-center rounded-lg h-36 bg-slate-900/30">
                    <Message
                        title="That's all from us today!"
                        description="You have reached to the end! No more blogs on the server!"
                    />
                </div>
            )}
        </main>
    );
}
