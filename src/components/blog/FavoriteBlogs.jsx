import useUserProfile from "../../hooks/useUserProfile";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";

export default function FavoriteBlogs() {
    const { user } = useUserProfile();

    return (
        <section className="sidebar-card">
            <SectionTitle title="Your Favourites ❤️" />

            {!user ? (
                <div>
                    <p>Login to see your favourite blogs!</p>
                </div>
            ) : (
                <div className="my-5 space-y-5">
                    {user?.favourites?.map((favBlog) => (
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
