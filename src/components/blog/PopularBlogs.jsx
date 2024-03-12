import React from "react";

import useAxios from "../../hooks/useAxios";
import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";
import FadeIn, { FadeInStagger } from "../framer/FadeIn";
import BlogItemSkeleton from "../ui/BlogItemSkeleton";
import Error from "../ui/Error";
import Message from "../ui/Message";

export default function PopularBlogs() {
    const { data, error, isLoading } = useAxios("blogs/popular");

    let content = null;

    if (isLoading) {
        content = (
            <React.Fragment>
                <BlogItemSkeleton />
                <BlogItemSkeleton />
                <BlogItemSkeleton />
            </React.Fragment>
        );
    }

    if (!isLoading && error) {
        content = (
            <FadeIn>
                <Error message={error?.message} />
            </FadeIn>
        );
    }

    if (!isLoading && !error && data?.blogs?.length <= 0) {
        content = (
            <FadeIn>
                <Message description="No popular blogs found!" />
            </FadeIn>
        );
    }

    if (!isLoading && !error && data?.blogs?.length > 0) {
        content = (
            <FadeInStagger className="space-y-5" faster>
                {data.blogs.map((blog) => (
                    <FadeIn key={blog.id}>
                        <BlogItem blog={blog} />
                    </FadeIn>
                ))}
            </FadeInStagger>
        );
    }

    return (
        <section className="sidebar-card">
            <SectionTitle title="Most Popular 👍️" />

            <div className="my-5 space-y-5">{content}</div>
        </section>
    );
}
