import useBlogsQuery from "../../hooks/useBlogsQuery";
import BlogCard from "../card/BlogCard";

export default function MainContents() {
    const { blogs } = useBlogsQuery(5, 1);
    console.log(blogs);

    return (
        <main className="space-y-3 md:col-span-5">
            {blogs.length > 0 &&
                blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </main>
    );
}
