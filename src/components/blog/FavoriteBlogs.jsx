import { useEffect } from "react";

import { actions } from "../../actions";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";

export default function FavoriteBlogs() {
    const { state } = useProfile();
    const { state: blogState, dispatch: blogDispatch } = useBlog();

    // console.log("state?.favouriteBlogs:", state?.favouriteBlogs);
    // console.log("blogState?.favouriteBlogs:", blogState?.favouriteBlogs);

    useEffect(() => {
        async function fetchFavoriteBlogs() {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
                );

                if (response.status === 200) {
                    blogDispatch({
                        type: actions.blog.FETCH_FAVORITE_BLOGS,
                        payload: {
                            blogs: response.data.blogs,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchFavoriteBlogs();
    }, [blogDispatch]);

    return (
        <section className="sidebar-card">
            <SectionTitle title="Your Favourites ❤️" />

            {!state?.user ? (
                <div>
                    <p>Login to see your favourite blogs!</p>
                </div>
            ) : (
                <div className="my-5 space-y-5">
                    {blogState?.favouriteBlogs?.map((favBlog) => (
                        <BlogItem
                            key={favBlog.id}
                            blog={favBlog}
                            category="favorite"
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
