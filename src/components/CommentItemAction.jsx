import { actions } from "../actions";
import { api } from "../api";
import useBlog from "../hooks/useBlog";

import trashIcon from "/assets/icons/delete.svg";

export default function CommentItemAction({ commentId }) {
    const { state, dispatch } = useBlog();

    const blogId = state?.blog?.id;

    async function handleDeleteComment(evt) {
        evt.preventDefault();

        try {
            const response = await api.delete(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs/${blogId}/comment/${commentId}`
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.blog.DELETE_COMMENT,
                    payload: {
                        blog: {
                            ...response.data,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="z-50 action-modal-container">
            <button
                className="action-menu-item hover:text-red-500"
                onClick={handleDeleteComment}
            >
                <img src={trashIcon} alt="Delete" />
                Delete
            </button>
        </div>
    );
}
