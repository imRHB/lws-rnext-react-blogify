import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
    const location = useLocation();

    const { auth } = useAuth();

    return (
        <React.Fragment>
            {auth?.user ? (
                <Outlet />
            ) : (
                <Navigate to="/login" state={{ from: location }} />
            )}
        </React.Fragment>
    );
}
