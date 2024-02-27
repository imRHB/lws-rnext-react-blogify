import { Link } from "react-router-dom";

import logo from "/assets/logo.svg";

export default function Header() {
    return (
        <header>
            <nav className="container">
                {/* <!-- Logo --> */}
                <div>
                    <Link to="/">
                        <img className="w-32" src={logo} alt="lws" />
                    </Link>
                </div>

                {/* <!-- Actions - Login, Write, Home, Search --> */}
                {/* <!-- Notes for Developers --> */}
                {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
                {/* <!-- For Not Logged in User - Login Menu --> */}
                <div>
                    <ul className="flex items-center space-x-5">
                        <li>
                            <Link
                                to="/create-blog"
                                className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                            >
                                Write
                            </Link>
                        </li>
                        <li>
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
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="transition-all duration-200 text-white/50 hover:text-white"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="flex items-center">
                            {/* <!-- Circular Div with background color --> */}
                            <div className="text-white bg-orange-600 avater-img">
                                <span className="">S</span>
                                {/* <!-- User's first name initial --> */}
                            </div>

                            {/* <!-- Logged-in user's name --> */}
                            <Link to="/profile">
                                <span className="ml-2 text-white">
                                    Saad Hasan
                                </span>
                            </Link>
                            {/* <!-- Profile Image --> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}