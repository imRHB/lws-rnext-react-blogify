import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useUserProfile from "../../hooks/useUserProfile";
import Search from "../Search";
import AppLink from "../ui/AppLink";
import Avatar from "../ui/Avatar";
import logo from "/assets/logo.svg";

export default function Header() {
    const { user } = useUserProfile();
    const { auth, setAuth } = useAuth();

    function handleLogout() {
        setAuth({});
    }

    return (
        <header className="sticky top-0 bg-[#030317] z-10 backdrop-filter backdrop-blur-md bg-opacity-50">
            <nav className="container">
                {/* <!-- Logo --> */}
                <div>
                    <Link to="/">
                        <img className="w-32" src={logo} alt="lws" />
                    </Link>
                </div>

                <Search />

                {/* <!-- Actions - Login, Write, Home, Search --> */}
                {/* <!-- Notes for Developers --> */}
                {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
                {/* <!-- For Not Logged in User - Login Menu --> */}
                <div>
                    <ul className="flex items-center space-x-5">
                        <li>
                            <AppLink
                                href="/create-blog"
                                label="Write"
                                variant="primary"
                            />
                        </li>
                        {/* <li>
                            <Link
                                to="/search"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img
                                    src="./assets/icons/search.svg"
                                    alt="Search"
                                />
                                <span>Search</span>
                            </Link>
                        </li> */}
                        <li>
                            {auth?.user ? (
                                <p
                                    className="cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </p>
                            ) : (
                                <Link
                                    to="/login"
                                    className="transition-all duration-200 text-white/50 hover:text-white"
                                >
                                    Login
                                </Link>
                            )}
                        </li>

                        {auth?.user && (
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center px-3 py-1.5 rounded-lg hover:bg-slate-800/80 space-x-3"
                                >
                                    <Avatar
                                        name={user?.firstName}
                                        imgSrc={`${
                                            import.meta.env.VITE_SERVER_BASE_URL
                                        }/uploads/avatar/${user?.avatar}`}
                                    />

                                    <p className="text-sm text-white">
                                        {user?.firstName}
                                        <br />
                                        {user?.lastName}
                                    </p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
