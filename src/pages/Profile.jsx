import { useEffect, useState } from "react";

import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

export default function ProfilePage() {
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
                console.log("response:", response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, [api, auth?.user?.id]);

    return (
        <div>
            Profile: {user?.id} - {user?.email}
        </div>
    );
}
