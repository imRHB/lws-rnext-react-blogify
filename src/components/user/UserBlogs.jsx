import useProfile from "../../hooks/useProfile";
import SectionTitle from "../SectionTitle";
import BlogCard from "../card/BlogCard";
import FadeIn, { FadeInStagger } from "../framer/FadeIn";
import Message from "../ui/Message";

export default function UserBlogs() {
    const { state } = useProfile();

    const publicProfile = state?.publicProfile;

    return (
        <FadeInStagger>
            <FadeIn>
                <SectionTitle
                    title={
                        publicProfile
                            ? `${publicProfile?.firstName} ${publicProfile?.lastName}'s Blogs`
                            : "Your Blogs"
                    }
                />
            </FadeIn>

            <FadeIn className="my-6 space-y-4">
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
            </FadeIn>
        </FadeInStagger>
    );
}
