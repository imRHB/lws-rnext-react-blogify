import { useEffect } from "react";

import { actions } from "../../actions";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";
import FadeIn from "../framer/FadeIn";
import Message from "../ui/Message";

export default function FavoriteBlogs() {
    const { state } = useProfile();
    const { state: blogState, dispatch: blogDispatch } = useBlog();

    useEffect(() => {
        async function fetchFavoriteBlogs() {
            blogDispatch({
                type: actions.global.DATA_FETCHING_STARTED,
            });

            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
                );

                if (response.status === 200) {
                    blogDispatch({
                        type: actions.blog.FETCH_FAVOURITE_BLOGS,
                        payload: {
                            blogs: response.data.blogs,
                        },
                    });
                }
            } catch (error) {
                blogDispatch({
                    type: actions.global.DATA_FETCHING_FAILED,
                    payload: {
                        error,
                    },
                });
            }
        }

        fetchFavoriteBlogs();
    }, [blogDispatch]);

    return (
        <section className="sidebar-card">
            <SectionTitle title="Your Favourites ❤️" />

            <div className="my-5 space-y-5">
                {!state?.user ? (
                    <FadeIn>
                        <Message description="Login to see your favourite blogs!" />
                    </FadeIn>
                ) : (
                    <div className="space-y-5">
                        {blogState?.favouriteBlogs?.length > 0 ? (
                            blogState?.favouriteBlogs?.map((favBlog) => (
                                <FadeIn key={favBlog.id}>
                                    <BlogItem
                                        key={favBlog.id}
                                        blog={favBlog}
                                        category="favorite"
                                    />
                                </FadeIn>
                            ))
                        ) : (
                            <FadeIn>
                                <Message description="You have no favourite blogs yet!" />
                            </FadeIn>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
