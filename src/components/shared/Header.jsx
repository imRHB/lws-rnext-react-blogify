import { Link, useNavigate } from "react-router-dom";

import { actions } from "../../actions";
import useProfile from "../../hooks/useProfile";
import Search from "../search/Search";
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
                        {state?.user && (
                            <li>
                                <AppLink
                                    href="/create-blog"
                                    label="Write"
                                    variant="primary"
                                />
                            </li>
                        )}

                        <li>
                            {state?.user ? (
                                <div
                                    className="flex items-center h-12 px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-900 hover:ring-1 ring-inset ring-slate-800"
                                    onClick={handleLogout}
                                    title="Logout"
                                >
                                    <img src={logoutIcon} alt="Logout" />
                                </div>
                            ) : (
                                <AppLink href="/login" label="Login" />
                            )}
                        </li>

                        {state?.user && (
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center px-3 py-1.5 rounded-lg space-x-3 hover:bg-slate-900 hover:ring-1 ring-inset ring-slate-800"
                                >
                                    <Avatar
                                        name={state?.user?.firstName}
                                        imgSrc={
                                            state?.user?.avatar
                                                ? `${
                                                      import.meta.env
                                                          .VITE_SERVER_BASE_URL
                                                  }/uploads/avatar/${
                                                      state?.user?.avatar
                                                  }`
                                                : null
                                        }
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
