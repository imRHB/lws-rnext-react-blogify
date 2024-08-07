import React, { useState } from "react";
import { toast } from "react-toastify";

import { actions } from "../../actions";
import { api } from "../../api";
import useProfile from "../../hooks/useProfile";

import pencilIcon from "/assets/icons/edit.svg";

export default function UserBio() {
    const { state, dispatch } = useProfile();

    const [bio, setBio] = useState(state?.user?.bio);
    const [isEditing, setIsEditing] = useState(false);

    const publicProfile = state?.publicProfile;

    async function handleUpdateBio(evt) {
        evt.preventDefault();

        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                { bio }
            );

            if (response.status === 200) {
                toast.success("Your bio has been updated!");

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
            dispatch({
                type: actions.global.DATA_FETCHING_FAILED,
                payload: {
                    error,
                },
            });
        }
    }

    return (
        <div className="flex items-start gap-4 mt-4 lg:mt-6">
            <div className="flex-1">
                {publicProfile && (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {publicProfile?.bio}
                    </p>
                )}

                {isEditing ? (
                    <textarea
                        name="bio"
                        id="bio"
                        cols="110"
                        rows="4"
                        value={bio}
                        onChange={(evt) => setBio(evt.target.value)}
                        className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                        onFocus={isEditing}
                    />
                ) : (
                    <React.Fragment>
                        {!publicProfile && (
                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {state?.user?.bio?.trim()?.length <= 0
                                    ? "No bio is added, add your bio"
                                    : state?.user?.bio}
                            </p>
                        )}
                    </React.Fragment>
                )}
            </div>

            {!publicProfile && !isEditing && (
                <button
                    className="rounded-full flex-center h-7 w-7"
                    onClick={() => setIsEditing(true)}
                >
                    <img src={pencilIcon} alt="Edit" />
                </button>
            )}

            {!publicProfile && isEditing && (
                <div className="flex flex-col gap-4 my-2">
                    <button
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 ring-1 ring-indigo-700 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-900 disabled:ring-indigo-950"
                        onClick={handleUpdateBio}
                        disabled={state?.user?.bio === bio}
                    >
                        Update
                    </button>

                    <button
                        className="px-6 py-2 text-white transition-all duration-200 rounded-md md:py-3 bg-slate-900 ring-1 ring-slate-800 hover:bg-slate-950"
                        onClick={() => {
                            setBio(state?.user?.bio);
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
