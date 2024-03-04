import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";

export default function FavoriteBlogs() {
    const { state } = useProfile();
    console.log("state?.favouriteBlogs:", state?.favouriteBlogs);

    return (
        <section className="sidebar-card">
            <SectionTitle title="Your Favourites ❤️" />

            {!state?.user ? (
                <div>
                    <p>Login to see your favourite blogs!</p>
                </div>
            ) : (
                <div className="my-5 space-y-5">
                    {state?.favouriteBlogs?.map((favBlog) => (
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
