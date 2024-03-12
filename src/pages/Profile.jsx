import { useEffect } from "react";

import { actions } from "../actions";
import FadeIn, { FadeInStagger } from "../components/framer/FadeIn";
import AppLayout from "../components/layout/AppLayout";
import Divider from "../components/shared/Divider";
import UserBio from "../components/user/UserBio";
import UserBlogs from "../components/user/UserBlogs";
import UserImage from "../components/user/UserImage";
import UserInfo from "../components/user/UserInfo";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

export default function ProfilePage() {
    const { dispatch } = useProfile();

    const { auth } = useAuth();
    const { api } = useApi();

    useEffect(() => {
        const fetchProfile = async () => {
            dispatch({
                type: actions.global.DATA_FETCHING_STARTED,
            });

            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                        auth?.user?.id
                    }`
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.FETCH_USER_PROFILE,
                        payload: {
                            blogs: response.data.blogs,
                        },
                    });
                }
            } catch (error) {
                dispatch({
                    type: actions.global.DATA_FETCHING_FAILED,
                    payload: {
                        error,
                    },
                });
            }
        };

        if (auth?.user?.id) {
            fetchProfile();
        }
    }, [api, auth?.user?.id, dispatch]);

    return (
        <AppLayout>
            <div className="mx-auto max-w-[1020px] py-8">
                <FadeInStagger className="container" faster>
                    <div className="flex flex-col items-center py-8 text-center">
                        <FadeIn>
                            <UserImage />
                        </FadeIn>
                        <FadeIn>
                            <UserInfo />
                        </FadeIn>
                        <FadeIn>
                            <UserBio />
                            <Divider />
                        </FadeIn>
                    </div>

                    <UserBlogs />
                </FadeInStagger>
            </div>
        </AppLayout>
    );
}
