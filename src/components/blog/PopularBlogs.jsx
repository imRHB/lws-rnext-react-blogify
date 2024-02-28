import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";

export default function PopularBlogs() {
    return (
        <section className="sidebar-card">
            <SectionTitle title="Most Popular 👍️" />

            <div className="my-5 space-y-5">
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
        </section>
    );
}
