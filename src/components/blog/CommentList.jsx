import useBlog from "../../hooks/useBlog";
import CommentItem from "../comment/CommentItem";

export default function CommentList() {
    const { state } = useBlog();

    const comments = state?.blog?.comments;

    return (
        <section>
            {comments &&
                comments?.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
        </section>
    );
}
