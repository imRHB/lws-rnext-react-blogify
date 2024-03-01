import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export default function CommentBoard() {
    return (
        <section id="comments">
            <div className="container w-full mx-auto md:w-10/12">
                <h2 className="my-8 text-3xl font-bold">Comments (3)</h2>

                <CommentBox />

                <CommentList />
            </div>
        </section>
    );
}
