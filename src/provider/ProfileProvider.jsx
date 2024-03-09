import { useEffect, useReducer, useState } from "react";

import { profileInitialState } from "../constant";
import { ProfileContext } from "../context";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { profileReducer } from "../reducers/profileReducer";

export default function ProfileProvider({ children }) {
    const [state, dispatch] = useReducer(profileReducer, profileInitialState);

    const [user, setUser] = useState(null);

    const { auth } = useAuth();
    const { api } = useApi();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                        auth?.user?.id
                    }`
                );

                setUser(response?.data);
            } catch (error) {
                throw new Error(error);
            }
        };

        if (auth?.user?.id) {
            fetchProfile();
        }
    }, [api, auth?.user?.id]);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
}
