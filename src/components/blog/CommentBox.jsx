import { useState } from "react";

import { api } from "../../api";
import useUserProfile from "../../hooks/useUserProfile";
import Avatar from "../ui/Avatar";

export default function CommentBox({ blogId }) {
    const { user } = useUserProfile();

    const [comment, setComment] = useState("");

    async function handlePostComment(evt) {
        evt.preventDefault();

        try {
            const response = await api.post(
                `${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/blogs/${blogId}/comment`,
                { content: comment }
            );

            if (response.status === 200) {
                setComment("");
                // setUser({ ...user, bio: response.data.user.bio });
                // setIsEditing(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="flex items-start space-x-4">
            <Avatar
                name={`${user?.firstName} ${user?.lastName}`}
                imgSrc={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/avatar/${user?.avatar}`}
            />
            <div className="w-full">
                {/* <textarea
                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                    placeholder="Write a comment"
                /> */}

                <textarea
                    name="bio"
                    id="bio"
                    cols="110"
                    rows="4"
                    value={comment}
                    onChange={(evt) => setComment(evt.target.value)}
                    className="block w-full p-4 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
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
