import useAxios from "../../hooks/useAxios";
import Message from "../Message";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";
import Error from "../ui/Error";
import Spinner from "../ui/Spinner";

export default function PopularBlogs() {
    const { data, error, isLoading } = useAxios("blogs/popular");

    let content = null;

    if (isLoading) {
        content = <Spinner />;
    }

    if (!isLoading && error) {
        content = <Error message={error?.message} />;
    }

    if (!isLoading && !error && data?.blogs?.length <= 0) {
        content = <Message description="No popular blogs found!" />;
    }

    if (!isLoading && !error && data?.blogs?.length > 0) {
        content = data.blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
        ));
    }

    return (
        <section className="sidebar-card">
            <SectionTitle title="Most Popular 👍️" />

            <div className="my-5 space-y-5">{content}</div>
        </section>
    );
}
