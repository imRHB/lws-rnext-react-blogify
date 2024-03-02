import { useState } from "react";

import { api } from "../../api";
import useUserProfile from "../../hooks/useUserProfile";
import pencilIcon from "/assets/icons/edit.svg";

export default function UserBio() {
    const { user, setUser } = useUserProfile();

    const [bio, setBio] = useState(user?.bio);
    const [isEditing, setIsEditing] = useState(false);

    async function handleUpdateBio(evt) {
        evt.preventDefault();

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                { bio }
            );

            if (response.status === 200) {
                setUser({ ...user, bio: response.data.user.bio });
                setIsEditing(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-start gap-2 mt-4 lg:mt-6">
            <div className="flex-1">
                {isEditing ? (
                    <textarea
                        name="bio"
                        id="bio"
                        cols="110"
                        rows="4"
                        value={bio}
                        onChange={(evt) => setBio(evt.target.value)}
                        className="block w-full p-4 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
                    />
                ) : (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {user?.bio}
                    </p>
                )}
            </div>

            {isEditing ? (
                <button
                    className="rounded-full flex-center h-7 w-7"
                    onClick={handleUpdateBio}
                >
                    Update
                </button>
            ) : (
                <button
                    className="rounded-full flex-center h-7 w-7"
                    onClick={() => setIsEditing(true)}
                >
                    <img src={pencilIcon} alt="Edit" />
                </button>
            )}
        </div>
    );
}
