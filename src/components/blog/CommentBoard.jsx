import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export default function CommentBoard({ blogId, comments }) {
    return (
        <section id="comments">
            <div className="container w-full mx-auto md:w-10/12">
                <h2 className="my-8 text-3xl font-bold">
                    Comments ({comments?.length})
                </h2>

                <CommentBox blogId={blogId} />

                <CommentList comments={comments} />
            </div>
        </section>
    );
}
