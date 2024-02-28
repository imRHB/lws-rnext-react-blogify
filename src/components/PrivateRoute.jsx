import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
    const { auth } = useAuth();

    return (
        <React.Fragment>
            {auth?.user ? <Outlet /> : <Navigate to="/login" />}
        </React.Fragment>
    );
}
