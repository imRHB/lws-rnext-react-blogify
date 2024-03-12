import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { actions } from "../actions";
import { api } from "../api";
import Field from "../components/form/Field";
import AppLayout from "../components/layout/AppLayout";
import Message from "../components/ui/Message";
import useBlog from "../hooks/useBlog";
import useProfile from "../hooks/useProfile";

export default function EditBlogPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const { state } = useProfile();
    const { dispatch } = useBlog();

    const isAuthor = state?.user?.id === blog?.author?.id;

    useEffect(() => {
        const fetchBlogById = async () => {
            dispatch({
                type: actions.global.DATA_FETCHING_STARTED,
            });

            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
                );

                if (response.status === 200) {
                    setBlog(response.data);
                    /* dispatch({
                        type: actions.blog.FETCH_BLOG_BY_ID,
                        payload: {
                            blog: {
                                ...response.data,
                            },
                        },
                    }); */
                }
            } catch (error) {
                dispatch({
                    type: actions.global.DATA_FETCHING_FAILED,
                    payload: {
                        error,
                    },
                });
            }
        };

        if (blogId) {
            fetchBlogById();
        }
    }, [blogId, dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm({
        defaultValues: {
            title: blog?.title,
            content: blog?.content,
            tags: blog?.tags,
            thumbnail: blog?.thumbnail,
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    async function onSubmit(data) {
        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("tags", data.tags);
            formData.append("thumbnail", data.thumbnail[0]);

            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
                formData
            );

            if (response.status === 200) {
                toast.success("Blog has been updated successfully!");

                dispatch({
                    type: actions.blog.UPDATE_BLOG,
                    payload: {
                        blogId,
                        blog: response.data,
                    },
                });

                navigate(`/blogs/${blogId}`);
            }
        } catch (error) {
            dispatch({
                type: actions.global.DATA_FETCHING_FAILED,
                payload: {
                    error,
                },
            });
        }
    }

    function handleCancel() {
        setBlog({});
        navigate(`/blogs/${blogId}`);
    }

    return (
        <AppLayout>
            <div className="container">
                {isAuthor ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-8/12 mx-auto my-8 space-y-5"
                    >
                        {errors.thumbnail && (
                            <p className="-mb-3 text-sm text-right text-red-500">
                                {errors.thumbnail.message}
                            </p>
                        )}
                        <div className="grid place-items-center bg-slate-900/50 h-[150px] rounded-md my-4">
                            <label htmlFor="thumbnail">
                                {imagePreview ?? blog?.thumbnail ? (
                                    <img
                                        src={
                                            imagePreview ??
                                            `${
                                                import.meta.env
                                                    .VITE_SERVER_BASE_URL
                                            }/uploads/blog/${blog?.thumbnail}`
                                        }
                                        alt="Preview"
                                        className="w-auto my-0.5 h-36 rounded"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-[150px] gap-4 transition-all cursor-pointer hover:scale-110">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                        <p>Upload cover image</p>
                                    </div>
                                )}
                            </label>
                            <Field>
                                <input
                                    {...register("thumbnail", {
                                        required: "Cover image is required",
                                    })}
                                    type="file"
                                    id="thumbnail"
                                    accept=".png, .jpg, .jpeg"
                                    className="absolute -top-[9999px] -left-[9999px]"
                                    onChange={handleImageChange}
                                />
                            </Field>
                        </div>

                        <Field error={errors.title}>
                            <input
                                {...register("title", {
                                    required: "Blog title is required",
                                    minLength: {
                                        value: 16,
                                        message: "Minimum 16 characters",
                                    },
                                })}
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={blog?.title}
                                placeholder="Blog title"
                                className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                            />
                        </Field>

                        <Field error={errors.tags}>
                            <input
                                {...register("tags", {
                                    required: "At least one tag is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters",
                                    },
                                })}
                                type="text"
                                id="tags"
                                name="tags"
                                defaultValue={blog?.tags}
                                placeholder="Comma separated tags, e.g.: JavaScript, React JS, etc."
                                className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                            />
                        </Field>

                        <Field error={errors.content}>
                            <textarea
                                {...register("content", {
                                    required: "Blog content is required",
                                    minLength: {
                                        value: 200,
                                        message: "Minimum 200 characters",
                                    },
                                })}
                                id="content"
                                name="content"
                                defaultValue={blog?.content}
                                placeholder="Blog content"
                                rows="4"
                                className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                            />
                        </Field>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 ring-1 ring-indigo-700 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-900 disabled:ring-indigo-950"
                            >
                                Update
                            </button>

                            <button
                                className="px-6 py-2 text-white transition-all duration-200 rounded-md md:py-3 bg-slate-900 ring-1 ring-slate-800 hover:bg-slate-950"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Message
                            title="Permission denied"
                            description="You are not authorized to update this blog!"
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
