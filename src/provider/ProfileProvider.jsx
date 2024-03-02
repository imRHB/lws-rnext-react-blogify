import { useEffect, useState } from "react";

import { ProfileContext } from "../context";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

export default function ProfileProvider({ children }) {
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
                console.log("response:", response);
                setUser(response?.data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (auth?.user?.id) {
            fetchProfile();
        }
    }, [api, auth?.user?.id]);

    return (
        <ProfileContext.Provider value={{ user, setUser }}>
            {children}
        </ProfileContext.Provider>
    );
}
