import React from "react";

import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogCard from "../card/BlogCard";

export default function UserBlogs() {
    const { state } = useProfile();

    const publicProfile = state?.publicProfile;

    return (
        <React.Fragment>
            <SectionTitle
                title={
                    publicProfile
                        ? `${publicProfile?.firstName} ${publicProfile?.lastName}'s Blogs`
                        : "Your Blogs"
                }
            />

            <div className="my-6 space-y-4">
                {publicProfile
                    ? publicProfile?.blogs?.map((blog) => (
                          <BlogCard key={blog.id} blog={blog} />
                      ))
                    : state?.blogs?.map((blog) => (
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
