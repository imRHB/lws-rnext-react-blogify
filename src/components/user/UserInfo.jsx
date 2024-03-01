import useAuth from "../../hooks/useAuth";

export default function UserInfo() {
    const { auth } = useAuth();

    return (
        <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                {auth?.user?.firstName} {auth?.user?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{auth?.user?.email}</p>
        </div>
    );
}
