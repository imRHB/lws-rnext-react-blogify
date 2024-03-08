import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { actions } from "../actions";
import { api } from "../api";
import AppLayout from "../components/AppLayout";
import Field from "../components/form/Field";
import useBlog from "../hooks/useBlog";

export default function CreateBlogPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const { dispatch } = useBlog();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
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

        if (file) setError("thumbnail", false);
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
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
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
                            placeholder="Blog content"
                            rows="4"
                            className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                        />
                    </Field>

                    {/* <Error message={errors?.root?.manual?.message} /> */}

                    <button
                        type="submit"
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-900 disabled:ring-indigo-950"
                    >
                        Create blog
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
