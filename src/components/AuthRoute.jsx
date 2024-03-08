import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function AuthRoute() {
    const { auth } = useAuth();

    return (
        <React.Fragment>
            {auth?.user ? <Navigate to="/" /> : <Outlet />}
        </React.Fragment>
    );
}
