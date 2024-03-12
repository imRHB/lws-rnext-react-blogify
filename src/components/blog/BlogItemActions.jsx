import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { actions } from "../../actions";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import Alert from "../ui/Alert";

import trashIcon from "/assets/icons/delete.svg";
import pencilIcon from "/assets/icons/edit.svg";

export default function BlogItemActions({ blogId, title, setShowActions }) {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { dispatch } = useBlog();
    const { dispatch: profileDispatch } = useProfile();

    const openModal = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        setIsOpen(true);
    };

    function handleEditBlog(evt) {
        evt.preventDefault();

        navigate(`/blogs/${blogId}/edit`);
    }

    async function handleDeleteBlog(evt) {
        evt.preventDefault();

        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
            );

            if (response.status === 200) {
                toast.success("Blog has been deleted successfully!");

                dispatch({
                    type: actions.blog.DELETE_BLOG,
                    payload: {
                        blogId,
                    },
                });

                profileDispatch({
                    type: actions.profile.DELETE_BLOG,
                    payload: {
                        blogId,
                    },
                });
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

    return (
        <div
            className="z-50 action-modal-container"
            onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
            }}
        >
            <button
                className="action-menu-item hover:text-lwsGreen"
                onClick={handleEditBlog}
            >
                <img src={pencilIcon} alt="Edit" />
                Edit
            </button>
            <button
                className="action-menu-item hover:text-red-500"
                onClick={(evt) => openModal(evt)}
            >
                <img src={trashIcon} alt="Delete" />
                Delete
            </button>

            <Alert isOpen={isOpen}>
                <div className="relative overflow-hidden text-left transition-all transform border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10 sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="px-4 pt-5 pb-4 bg-slate-900 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3
                                    className="text-xl font-bold leading-6 text-gray-100"
                                    id="modal-title"
                                >
                                    Delete
                                </h3>
                                <div className="mt-2">
                                    <p className="text-gray-400">
                                        Are you sure you want to delete the blog
                                        titled{" "}
                                        <span className="font-semibold text-slate-300">
                                            {title}
                                        </span>
                                        ? All of your blog data will be
                                        permanently removed. This action cannot
                                        be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-slate-950/30 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={(evt) => {
                                handleDeleteBlog(evt);
                                setIsOpen(false);
                                setShowActions(false);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-200 rounded-md shadow-sm bg-slate-900 ring-1 ring-inset ring-slate-800 hover:bg-slate-950 sm:mt-0 sm:w-auto"
                            onClick={(evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                setIsOpen(false);
                                setShowActions(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
