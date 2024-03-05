import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { actions } from "../actions";
import { api } from "../api";
import AppLayout from "../components/AppLayout";
import useBlog from "../hooks/useBlog";

export default function CreateBlogPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const { dispatch } = useBlog();

    const {
        register,
        handleSubmit,
        // formState: { errors },
        // setError,
    } = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
            thumbnail: "",
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
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("tags", data.tags);
            formData.append("thumbnail", data.thumbnail[0]);

            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
                formData
            );

            if (response.status === 201) {
                dispatch({
                    type: actions.blog.CREATE_BLOG,
                    payload: {
                        blog: response.data.blog,
                    },
                });

                navigate(`/blogs/${response.data.blog.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AppLayout>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="createBlog">
                    <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                        <label htmlFor="thumbnail">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: "auto", height: "100px" }}
                                />
                            ) : (
                                <div className="flex items-center gap-4 transition-all cursor-pointer hover:scale-110">
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
                                    <p>Upload Your Image</p>
                                </div>
                            )}
                        </label>
                        <input
                            {...register("thumbnail")}
                            type="file"
                            id="thumbnail"
                            accept=".png, .jpg, .jpeg"
                            style={{
                                position: "absolute",
                                top: "-9999px",
                                left: "-9999px",
                            }}
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            {...register("title", {
                                required: "Blog title is required",
                            })}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your blog title"
                            className="block w-full p-4 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            {...register("tags", {
                                required: "At least one tag is required",
                            })}
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                            className="block w-full p-4 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
                        />
                    </div>

                    <div className="mb-6">
                        <textarea
                            {...register("content", {
                                required: "Blog content is required",
                            })}
                            id="content"
                            name="content"
                            placeholder="Write your blog content"
                            // rows="8"
                            rows="4"
                            className="block w-full p-4 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"

                        // onClick={handleUpdateBio}
                    >
                        Create blog
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
