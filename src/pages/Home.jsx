import FavoriteBlogs from "../components/blog/FavoriteBlogs";
import MainBlogs from "../components/blog/MainBlogs";
import PopularBlogs from "../components/blog/PopularBlogs";
import AppLayout from "../components/layout/AppLayout";

export default function HomePage() {
    return (
        <AppLayout>
            <section className="container min-h-[60vh]">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-7">
                    <MainBlogs />

                    <aside className="w-full h-full space-y-5 md:col-span-2">
                        <PopularBlogs />
                        <FavoriteBlogs />
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}
