import BlogActions from "../components/blog/BlogActions";
import BlogContents from "../components/blog/BlogContents";
import CommentBoard from "../components/blog/CommentBoard";

export default function BlogDetails() {
    return (
        <main>
            <BlogContents />
            <CommentBoard />
            <BlogActions />
        </main>
    );
}
