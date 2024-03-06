import { useNavigate } from "react-router-dom";

import { actions } from "../../actions";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";

import trashIcon from "/assets/icons/delete.svg";
import pencilIcon from "/assets/icons/edit.svg";

export default function BlogItemActions({ blogId }) {
    const navigate = useNavigate();

    const { dispatch } = useBlog();
    const { dispatch: profileDispatch } = useProfile();

    function handleEditBlog(evt) {
        evt.preventDefault();

        navigate(`/blogs/${blogId}/edit`);
    }

    async function handleDeleteBlog(evt) {
        evt.preventDefault();

        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
            );

            if (response.status === 200) {
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
            console.error(error);
        }
    }

    return (
        <div className="z-50 action-modal-container">
            <button
                className="action-menu-item hover:text-lwsGreen"
                onClick={handleEditBlog}
            >
                <img src={pencilIcon} alt="Edit" />
                Edit
            </button>
            <button
                className="action-menu-item hover:text-red-500"
                onClick={handleDeleteBlog}
            >
                <img src={trashIcon} alt="Delete" />
                Delete
            </button>
        </div>
    );
}
