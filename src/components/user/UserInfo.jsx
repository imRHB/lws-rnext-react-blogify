import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

export default function UserInfo() {
    const { auth } = useAuth();
    const { state } = useProfile();

    const publicProfile = state?.publicProfile;

    return (
        <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                {!publicProfile
                    ? `${auth?.user?.firstName} ${auth?.user?.lastName}`
                    : `${publicProfile?.firstName} ${publicProfile?.lastName}`}
            </h3>
            {/* not showing the user email */}
            {!publicProfile && (
                <p className="leading-[231%] lg:text-lg">{auth?.user?.email}</p>
            )}
        </div>
    );
}
