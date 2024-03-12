import { useState } from "react";
import { Link } from "react-router-dom";

import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import Avatar from "../ui/Avatar";

import CommentItemAction from "./CommentItemAction";
import dotsIcon from "/assets/icons/3dots.svg";

export default function CommentItem({ comment }) {
    const [showActions, setShowActions] = useState(false);

    const { state } = useProfile();
    const { state: blogState } = useBlog();

    const isAuthorLoggedIn = state?.user?.id === comment?.author?.id;
    const isAvatarAvailable = comment?.author?.avatar;

    return (
        <div
            key={comment?.id}
            className="relative my-8 space-x-4"
            onClick={() => setShowActions(false)}
        >
            <div className="flex items-start mr-12 space-x-4 md:mr-20">
                <Link
                    to={
                        isAuthorLoggedIn
                            ? "/profile"
                            : `/profile/${comment?.author?.id}`
                    }
                >
                    <Avatar
                        name={
                            isAuthorLoggedIn
                                ? state?.user?.firstName
                                : comment?.author?.firstName
                        }
                        imgSrc={
                            isAuthorLoggedIn
                                ? isAvatarAvailable
                                    ? `${
                                          import.meta.env.VITE_SERVER_BASE_URL
                                      }/uploads/avatar/${state?.user?.avatar}`
                                    : null
                                : isAvatarAvailable
                                ? `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${comment?.author?.avatar}`
                                : null
                        }
                    />
                </Link>
                <div className="w-full">
                    <p className="w-fit">
                        <Link
                            to={
                                isAuthorLoggedIn
                                    ? "/profile"
                                    : `/profile/${comment?.author?.id}`
                            }
                        >
                            <h5 className="font-bold text-indigo-600 hover:text-indigo-700">
                                {comment?.author?.firstName}{" "}
                                {comment?.author?.lastName}
                            </h5>
                        </Link>
                    </p>
                    <p className="text-slate-300">{comment?.content}</p>
                </div>
            </div>

            {state?.user?.id === comment?.author?.id && (
                <div className="absolute -top-1.5 -right-1.5">
                    <button
                        className="p-1.5 rounded-full hover:bg-slate-900"
                        onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setShowActions((prevState) => !prevState);
                        }}
                    >
                        <img src={dotsIcon} alt="3dots of Action" />
                    </button>

                    {showActions && (
                        <CommentItemAction
                            blogId={blogState?.blog?.id}
                            commentId={comment?.id}
                            setShowActions={setShowActions}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
