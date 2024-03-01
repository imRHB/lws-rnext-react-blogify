import useBlogs from "../../hooks/useBlogs";
import BlogCard from "../card/BlogCard";

export default function MainContents() {
    const { blogs, hasMore, loaderRef } = useBlogs();

    return (
        <main className="space-y-3 md:col-span-5">
            {blogs.length > 0 &&
                blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}

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
