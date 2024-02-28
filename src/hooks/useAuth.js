import { useContext, useDebugValue } from "react";

import { AuthContext } from "../context";

export default function useAuth() {
    const { auth } = useContext(AuthContext);

    useDebugValue(auth, (auth) =>
        auth?.user ? `user: ${auth.user.email} logged in` : "no user logged in"
    );

    return useContext(AuthContext);
}
