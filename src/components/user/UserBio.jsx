import useUserProfile from "../../hooks/useUserProfile";
import pencilIcon from "/assets/icons/edit.svg";

export default function UserBio() {
    const { user } = useUserProfile();

    return (
        <div className="flex items-start gap-2 mt-4 lg:mt-6">
            <div className="flex-1">
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                    {user?.bio}
                </p>
            </div>

            <button className="rounded-full flex-center h-7 w-7">
                <img src={pencilIcon} alt="Edit" />
            </button>
        </div>
    );
}
