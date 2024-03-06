import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { actions } from "../actions";
import { api } from "../api";
import AppLayout from "../components/AppLayout";
import BlogActions from "../components/blog/BlogActions";
import BlogContents from "../components/blog/BlogContents";
import CommentBoard from "../components/blog/CommentBoard";
import useBlog from "../hooks/useBlog";

export default function BlogDetailsPage() {
    const [blog, setBlog] = useState({});
    const { blogId } = useParams();
    const { state, dispatch } = useBlog();

    useEffect(() => {
        const fetchBlogById = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
                );

                if (response.status === 200) {
                    setBlog(response?.data);
                    dispatch({
                        type: actions.blog.FETCH_BLOG_BY_ID,
                        payload: {
                            blog: {
                                ...response.data,
                            },
                        },
                    });
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (blogId) {
            fetchBlogById();
        }
    }, [blogId, dispatch]);

    return (
        <AppLayout>
            <BlogContents blog={blog} />
            <CommentBoard comments={state?.blog?.comments} />
            <BlogActions />
        </AppLayout>
    );
}
