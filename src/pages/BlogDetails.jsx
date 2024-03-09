import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { actions } from "../actions";
import { api } from "../api";
import AppLayout from "../components/AppLayout";
import Message from "../components/Message";
import BlogActions from "../components/blog/BlogActions";
import BlogContents from "../components/blog/BlogContents";
import CommentBoard from "../components/blog/CommentBoard";
import Spinner from "../components/ui/Spinner";
import useBlog from "../hooks/useBlog";

export default function BlogDetailsPage() {
    const [blog, setBlog] = useState({});
    const { blogId } = useParams();
    const { state, dispatch } = useBlog();

    const { isLoading, error } = state;

    useEffect(() => {
        const fetchBlogById = async () => {
            dispatch({
                type: actions.blog.DATA_FETCHING_STARTED,
            });

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
                dispatch({
                    type: actions.blog.DATA_FETCHING_FAILED,
                    payload: {
                        error: error.response.data,
                    },
                });
            }
        };

        if (blogId) {
            fetchBlogById();
        }
    }, [blogId, dispatch]);

    let content = null;

    if (isLoading) {
        content = <Spinner />;
    }

    if (!isLoading && error) {
        content = (
            <Message
                title={error?.message}
                description="We couldn't found the blog!"
            />
        );
    }

    if (!isLoading && !error) {
        content = (
            <React.Fragment>
                <BlogContents blog={blog} />
                <CommentBoard comments={state?.blog?.comments} />
                <BlogActions />
            </React.Fragment>
        );
    }

    return (
        <AppLayout>
            <section className="container min-h-[60vh]">{content}</section>
        </AppLayout>
    );
}
