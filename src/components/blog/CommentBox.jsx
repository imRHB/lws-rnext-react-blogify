import { useState } from "react";
import { toast } from "react-toastify";

import { actions } from "../../actions";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import Avatar from "../ui/Avatar";

export default function CommentBox() {
    // const { user } = useUserProfile();
    const [comment, setComment] = useState("");

    const { state } = useProfile();
    const { state: blogState, dispatch } = useBlog();

    const blogId = blogState?.blog?.id;

    async function handlePostComment(evt) {
        evt.preventDefault();

        if (comment.trim().length <= 0) {
            toast.warning("Comment should not be empty!");
            return;
        }

        /* dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        }); */

        try {
            const response = await api.post(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs/${blogId}/comment`,
                { content: comment }
            );

            if (response.status === 200) {
                setComment("");
                dispatch({
                    type: actions.blog.POST_COMMENT,
                    payload: {
                        blog: {
                            ...response.data,
                        },
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
        <section className="flex items-start space-x-4">
            <Avatar
                name={state?.user?.firstName}
                imgSrc={
                    state?.user?.avatar
                        ? `${
                              import.meta.env.VITE_SERVER_BASE_URL
                          }/uploads/avatar/${state?.user?.avatar}`
                        : null
                }
            />
            <div className="w-full">
                <textarea
                    name="bio"
                    id="bio"
                    cols="110"
                    rows="4"
                    value={comment}
                    onChange={(evt) => setComment(evt.target.value)}
                    className="block w-full p-4 transition bg-transparent rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-slate-950/20 focus:ring-2 focus:ring-blue-900/50 ring-slate-800"
                    required
                />

                <div className="flex justify-end mt-4">
                    <button
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                        onClick={handlePostComment}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </section>
    );
}
