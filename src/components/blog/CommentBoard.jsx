import useProfile from "../../hooks/useProfile";
import FadeIn from "../framer/FadeIn";
import Message from "../ui/Message";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export default function CommentBoard({ comments }) {
    const { state } = useProfile();

    return (
        <FadeIn id="comments" className="w-full mx-auto space-y-8 md:w-10/12">
            <h2 className="text-3xl font-bold">
                Comments ({comments?.length})
            </h2>

            {state?.user ? (
                <CommentBox />
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg h-36 bg-slate-900/30">
                    <Message
                        title="You're not logged in!"
                        description="Login to comment on this blog!"
                    />
                </div>
            )}

            <CommentList />
        </FadeIn>
    );
}
