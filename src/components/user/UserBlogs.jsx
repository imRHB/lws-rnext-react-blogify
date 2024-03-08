import React from "react";

import useProfile from "../../hooks/useProfile";
import Message from "../Message";
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
                {publicProfile ? (
                    <div className="flex flex-col items-center justify-center gap-6">
                        {publicProfile?.blogs?.length <= 0 ? (
                            <div className="my-24">
                                <Message
                                    title="No blogs found!"
                                    description={`${publicProfile?.firstName} ${publicProfile?.lastName} has not published any blogs yet!`}
                                />
                            </div>
                        ) : (
                            publicProfile?.blogs?.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6">
                        {state?.blogs?.length <= 0 ? (
                            <div className="my-24">
                                <Message
                                    title="No blogs found!"
                                    description="You have not published any blogs yet!"
                                />
                            </div>
                        ) : (
                            state?.blogs?.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
