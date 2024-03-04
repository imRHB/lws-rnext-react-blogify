import { Link } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import Avatar from "../ui/Avatar";

export default function CommentList({ comments }) {
    const { state } = useProfile();

    return (
        <section>
            {comments &&
                comments?.map((comment) => (
                    <div
                        key={comment?.id}
                        className="flex items-start my-8 space-x-4"
                    >
                        <Link to="/profile">
                            <Avatar
                                name={state?.user?.firstName}
                                imgSrc={
                                    state?.user &&
                                    state?.user?.id === comment?.author?.id
                                        ? `${
                                              import.meta.env
                                                  .VITE_SERVER_BASE_URL
                                          }/uploads/avatar/${
                                              state?.user?.avatar
                                          }`
                                        : `${
                                              import.meta.env
                                                  .VITE_SERVER_BASE_URL
                                          }/uploads/avatar/${
                                              comment?.author?.avatar
                                          }`
                                }
                            />
                        </Link>
                        <div className="w-full">
                            <Link to="/profile">
                                <h5 className="font-bold text-slate -500">
                                    {comment?.author?.firstName}{" "}
                                    {comment?.author?.lastName}
                                </h5>
                            </Link>
                            <p className="text-slate-300">{comment?.content}</p>
                        </div>
                    </div>
                ))}
        </section>
    );
}
