import Divider from "../components/shared/Divider";
import Avatar from "../components/ui/Avatar";
import UserBio from "../components/user/UserBio";
import UserBlogs from "../components/user/UserBlogs";
import UserInfo from "../components/user/UserInfo";
import useUserProfile from "../hooks/useUserProfile";

import pencilIcon from "/assets/icons/edit.svg";

export default function ProfilePage() {
    const { user } = useUserProfile();

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                {/* <!-- profile info --> */}
                <div className="flex flex-col items-center py-8 text-center">
                    {/* <!-- profile image --> */}
                    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                        {/* <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
                            <span className="">S</span>
                        </div> */}
                        <Avatar name={user.firstName} size="large" />

                        <button className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80">
                            <img src={pencilIcon} alt="Edit" />
                        </button>
                    </div>
                    <UserInfo />
                    <UserBio />
                    <Divider />
                </div>

                <UserBlogs />
            </div>
        </main>
    );
}
