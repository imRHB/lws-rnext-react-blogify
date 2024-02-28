import FavoriteBlogs from "./FavoriteBlogs";
import MainContents from "./MainContents";
import PopularBlogs from "./PopularBlogs";

export default function BlogContents() {
    return (
        <section className="container">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-7">
                <MainContents />

                <aside className="w-full h-full space-y-5 md:col-span-2">
                    <PopularBlogs />
                    <FavoriteBlogs />
                </aside>
            </section>
        </section>
    );
}
