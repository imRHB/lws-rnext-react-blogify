import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { actions } from "../actions";
import AppLayout from "../components/AppLayout";
import Divider from "../components/shared/Divider";
import UserBio from "../components/user/UserBio";
import UserBlogs from "../components/user/UserBlogs";
import UserImage from "../components/user/UserImage";
import UserInfo from "../components/user/UserInfo";
import useProfile from "../hooks/useProfile";

export default function PublicProfilePage() {
    // const { search } = useLocation();
    // const queryParams = new URLSearchParams(search);
    // const userId = queryParams.get("view");
    const { userId } = useParams();

    const { dispatch } = useProfile();

    useEffect(() => {
        const fetchPublicProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.FETCH_PUBLIC_PROFILE,
                        payload: {
                            publicProfile: response.data,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (userId) {
            fetchPublicProfile();
        }

        return () => {
            dispatch({
                type: actions.profile.FETCH_PUBLIC_PROFILE,
                payload: {
                    publicProfile: null,
                },
            });
        };
    }, [userId, dispatch]);

    return (
        <AppLayout>
            <div className="mx-auto max-w-[1020px] py-8">
                <div className="container">
                    <div className="flex flex-col items-center py-8 text-center">
                        <UserImage />
                        <UserInfo />
                        <UserBio />
                        <Divider />
                    </div>

                    <UserBlogs />
                </div>
            </div>
        </AppLayout>
    );
}
