import { api } from "../../api";

import { actions } from "../../actions";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";

import commentIcon from "/assets/icons/comment.svg";
import heartIconFilled from "/assets/icons/heart-filled.svg";
import heartIcon from "/assets/icons/heart.svg";
import thumbsUpFilledIcon from "/assets/icons/like-filled.svg";
import thumbsUpIcon from "/assets/icons/like.svg";

export default function BlogActions() {
    const { state, dispatch } = useBlog();
    const { state: profileState } = useProfile();

    const blogId = state?.blog?.id;
    const comments = state?.blog?.comments;

    const isLiked = state?.blog?.likes?.some(
        (item) => profileState?.user?.id === item?.id
    );

    const isFavourite = state?.blog?.isFavourite;
    // const isFavourite = state?.favouriteBlogs?.find(
    //     (blog) => blog?.id === blogId
    // );

    async function handleToggleLike() {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`,
                {}
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.blog.TOGGLE_LIKE_BLOG,
                    payload: {
                        blog: {
                            ...state.blog,
                            likes: response.data.likes,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleToggleFavourite() {
        try {
            const response = await api.patch(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs/${blogId}/favourite`,
                {}
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.blog.TOGGLE_FAVOURITE_BLOG,
                    payload: {
                        blog: response.data,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={handleToggleLike}>
                    <img
                        src={isLiked ? thumbsUpFilledIcon : thumbsUpIcon}
                        alt="like"
                    />
                    <span>{state?.blog?.likes?.length}</span>
                </li>

                <li onClick={handleToggleFavourite}>
                    <img
                        src={isFavourite ? heartIconFilled : heartIcon}
                        alt="Favorite"
                    />
                </li>

                <a href="#comments">
                    <li>
                        <img src={commentIcon} alt="Comments" />
                        <span>{comments?.length}</span>
                    </li>
                </a>
            </ul>
        </div>
    );
}
