import { useState } from "react";

import { actions } from "../../actions";
import { api } from "../../api";
import useProfile from "../../hooks/useProfile";

import pencilIcon from "/assets/icons/edit.svg";

export default function UserBio() {
    const { state, dispatch } = useProfile();

    const [bio, setBio] = useState(state?.user?.bio);
    const [isEditing, setIsEditing] = useState(false);

    async function handleUpdateBio(evt) {
        evt.preventDefault();

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                { bio }
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.UPDATE_USER_PROFILE,
                    payload: {
                        ...state,
                        user: response.data.user,
                    },
                });

                setIsEditing(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-start gap-4 mt-4 lg:mt-6">
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
                        {state?.user?.bio}
                    </p>
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-4 my-2">
                    <button
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                        onClick={handleUpdateBio}
                    >
                        Update
                    </button>

                    <button
                        className="px-6 py-2 text-white transition-all duration-200 rounded-md bg-slate-800 md:py-3 hover:bg-slate-900"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
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
