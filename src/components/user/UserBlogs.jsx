import React from "react";

import useUserProfile from "../../hooks/useUserProfile";
import BlogCard from "../card/BlogCard";
import SectionTitle from "../SectionTitle";

export default function UserBlogs() {
    const { user } = useUserProfile();

    return (
        <React.Fragment>
            {/* <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4> */}
            <SectionTitle title="Your Blogs" />

            <div className="my-6 space-y-4">
                {user?.blogs.length > 0 &&
                    user?.blogs.map((blog) => (
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
