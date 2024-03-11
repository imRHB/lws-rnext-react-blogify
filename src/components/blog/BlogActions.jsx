import { toast } from "react-toastify";

import { actions } from "../../actions";
import { api } from "../../api";
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

    const isLoggedIn = profileState?.user;

    const blogId = state?.blog?.id;
    const comments = state?.blog?.comments;

    const isLiked = state?.blog?.likes?.some(
        (item) => profileState?.user?.id === item?.id
    );

    const isFavourite = isLoggedIn && state?.blog?.isFavourite;
    // const isFavourite = state?.favouriteBlogs?.find(
    //     (blog) => blog?.id === blogId
    // );

    async function handleToggleLike() {
        if (!isLoggedIn) {
            toast.warning("Login to like this blog!");
            return;
        }

        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

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
            dispatch({
                type: actions.global.DATA_FETCHING_FAILED,
                payload: {
                    error,
                },
            });
        }
    }

    async function handleToggleFavourite() {
        if (!isLoggedIn) {
            toast.warning("Login to add this blog in your favourite list!");
            return;
        }

        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

        try {
            const response = await api.patch(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs/${blogId}/favourite`,
                {}
            );

            if (response.status === 200) {
                toast.success(
                    `You have ${isFavourite ? "removed" : "added"} this blog ${
                        isFavourite ? "from" : "in"
                    } your favourite list!`
                );

                dispatch({
                    type: actions.blog.TOGGLE_FAVOURITE_BLOG,
                    payload: {
                        blog: response.data,
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
