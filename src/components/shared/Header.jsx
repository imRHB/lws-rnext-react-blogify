import { Link, useNavigate } from "react-router-dom";

import { actions } from "../../actions";
import useProfile from "../../hooks/useProfile";
import Search from "../Search";
import AppLink from "../ui/AppLink";
import Avatar from "../ui/Avatar";

import logoutIcon from "/assets/icons/logout.svg";
import logo from "/assets/logo.svg";

export default function Header() {
    const navigate = useNavigate();

    const { state, dispatch } = useProfile();

    function handleLogout() {
        dispatch({
            type: actions.profile.USER_SIGNED_OUT,
        });
        navigate("/");
    }

    return (
        <header className="sticky top-0 bg-[#030317] z-10 backdrop-filter backdrop-blur-md bg-opacity-50">
            <nav className="container">
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
                            {state?.user ? (
                                <div
                                    className="flex items-center h-12 px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-800/80"
                                    onClick={handleLogout}
                                >
                                    <img src={logoutIcon} alt="Logout" />
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="transition-all duration-200 text-white/50 hover:text-white"
                                >
                                    Login
                                </Link>
                            )}
                        </li>

                        {state?.user && (
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center px-3 py-1.5 rounded-lg hover:bg-slate-800/80 space-x-3"
                                >
                                    <Avatar
                                        name={state?.user?.firstName}
                                        imgSrc={`${
                                            import.meta.env.VITE_SERVER_BASE_URL
                                        }/uploads/avatar/${
                                            state?.user?.avatar
                                        }`}
                                    />

                                    <p className="text-sm text-white">
                                        {state?.user?.firstName}
                                        <br />
                                        {state?.user?.lastName}
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
