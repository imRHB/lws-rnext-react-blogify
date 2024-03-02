import { useRef, useState } from "react";

import { api } from "../../api";
import useUserProfile from "../../hooks/useUserProfile";
import Avatar from "../ui/Avatar";

import Spinner from "../ui/Spinner";
import pencilIcon from "/assets/icons/edit.svg";

export default function UserImage() {
    const { user, setUser } = useUserProfile();

    const avatarUploadRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

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
                setUser({ ...user, avatar: response.data.user.avatar });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {/* <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
                            <span className="">S</span>
                        </div> */}
            {isUploading ? (
                <div className="grid text-sm text-white rounded-full bg-slate-900 size-32 place-items-center">
                    <Spinner status="Uploading..." />
                </div>
            ) : (
                <Avatar
                    name={user.firstName}
                    imgSrc={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${user.avatar}`}
                    size="large"
                />
            )}

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
        </div>
    );
}
