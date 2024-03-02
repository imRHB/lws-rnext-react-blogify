import Divider from "../components/shared/Divider";
import UserBio from "../components/user/UserBio";
import UserBlogs from "../components/user/UserBlogs";
import UserImage from "../components/user/UserImage";
import UserInfo from "../components/user/UserInfo";

export default function ProfilePage() {
    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <div className="flex flex-col items-center py-8 text-center">
                    <UserImage />
                    <UserInfo />
                    <UserBio />
                    <Divider />
                </div>

                <UserBlogs />
            </div>
        </main>
    );
}
