import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../api";
import BlogActions from "../components/blog/BlogActions";
import BlogContents from "../components/blog/BlogContents";
import CommentBoard from "../components/blog/CommentBoard";

export default function BlogDetailsPage() {
    const { blogId } = useParams();

    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
                );

                setBlog(response?.data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (blogId) {
            fetchProfile();
        }
    }, [blogId]);

    console.log("blog:", blog);

    return (
        <main>
            <BlogContents blog={blog} />
            <CommentBoard />
            <BlogActions />
        </main>
    );
}
