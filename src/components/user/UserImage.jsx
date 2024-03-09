import { useRef, useState } from "react";

import { actions } from "../../actions";
import { api } from "../../api";
import useProfile from "../../hooks/useProfile";
import Avatar from "../ui/Avatar";
import Spinner from "../ui/Spinner";

import pencilIcon from "/assets/icons/edit.svg";

export default function UserImage() {
    const avatarUploadRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const { state, dispatch } = useProfile();

    const publicProfile = state?.publicProfile;

    function handleUpdateAvatar(evt) {
        evt.preventDefault();

        avatarUploadRef.current.click();
        avatarUploadRef.current.addEventListener("change", avatarPreview);
    }

    async function avatarPreview(evt) {
        evt.preventDefault();

        setIsUploading(true);
        try {
            const file = await avatarUploadRef.current.files[0];

            if (!file) {
                console.error("No file selected");
                return;
            }

            const formData = new FormData();
            formData.append("avatar", file);

            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                formData
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.UPDATE_USER_PROFILE,
                    payload: {
                        ...state,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {isUploading ? (
                <div className="grid text-sm text-white rounded-full bg-slate-900 size-32 place-items-center">
                    <Spinner status="Uploading..." />
                </div>
            ) : (
                <Avatar
                    name={
                        !publicProfile
                            ? state?.user?.firstName
                            : publicProfile?.firstName
                    }
                    imgSrc={
                        !publicProfile
                            ? state?.user?.avatar
                                ? `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${state?.user?.avatar}`
                                : null
                            : publicProfile?.avatar
                            ? `${
                                  import.meta.env.VITE_SERVER_BASE_URL
                              }/uploads/avatar/${publicProfile?.avatar}`
                            : null
                    }
                    size="large"
                />
            )}

            {!publicProfile && (
                <form>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="avatar"
                        id="avatar"
                        ref={avatarUploadRef}
                        hidden
                    />

                    <button
                        type="submit"
                        className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80 disabled:cursor-not-allowed"
                        onClick={handleUpdateAvatar}
                        disabled={isUploading}
                    >
                        <img src={pencilIcon} alt="Edit" />
                    </button>
                </form>
            )}
        </div>
    );
}
