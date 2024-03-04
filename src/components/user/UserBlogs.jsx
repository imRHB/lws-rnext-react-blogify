import React from "react";

import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogCard from "../card/BlogCard";

export default function UserBlogs() {
    const { state } = useProfile();

    return (
        <React.Fragment>
            <SectionTitle title="Your Blogs" />

            <div className="my-6 space-y-4">
                {state?.blogs?.length > 0 &&
                    state?.blogs?.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}

                {/* {hasMore ? (
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
                )} */}
            </div>
        </React.Fragment>
    );
}
