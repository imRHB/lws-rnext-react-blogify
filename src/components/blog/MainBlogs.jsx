import React, { useEffect } from "react";

import { actions } from "../../actions";
import useBlog from "../../hooks/useBlog";
import useMainBlogs from "../../hooks/useMainBlogs";
import BlogCard from "../card/BlogCard";
import FadeIn from "../framer/FadeIn";
import BlogCardSkeleton from "../ui/BlogCardSkeleton";
import Message from "../ui/Message";

export default function MainBlogs() {
    const { blogs, error, hasMore, loaderRef } = useMainBlogs();

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
        <div className="space-y-5 md:col-span-5">
            {state?.blogs && state?.blogs.length < 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <Message
                        title="No blogs found!"
                        description="No blogs found on the server, check back later."
                    />
                </div>
            ) : (
                state?.blogs.map((blog) => (
                    <FadeIn key={blog.id}>
                        <BlogCard blog={blog} />
                    </FadeIn>
                ))
            )}

            {hasMore ? (
                <div
                    ref={loaderRef}
                    className="flex flex-col items-center justify-center w-full h-auto gap-5"
                >
                    {/* <Spinner />
                    <Message description="Fetching blogs" /> */}
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </div>
            ) : (
                <React.Fragment>
                    {error ? (
                        <FadeIn className="flex flex-col items-center justify-center">
                            <Message
                                title={error?.code}
                                description={error?.message}
                            />
                        </FadeIn>
                    ) : (
                        <FadeIn className="flex items-center justify-center rounded-lg h-36 bg-slate-900/30">
                            <Message
                                title="That's all from us today!"
                                description="You have reached to the end! No more blogs on the server!"
                            />
                        </FadeIn>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
