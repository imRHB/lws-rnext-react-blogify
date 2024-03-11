import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { actions } from "../actions";
import AppLayout from "../components/AppLayout";
import Message from "../components/Message";
import FadeIn, { FadeInStagger } from "../components/framer/FadeIn";
import Divider from "../components/shared/Divider";
import Spinner from "../components/ui/Spinner";
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

    const { state, dispatch } = useProfile();
    const { isLoading, error } = state;

    useEffect(() => {
        const fetchPublicProfile = async () => {
            dispatch({
                type: actions.global.DATA_FETCHING_STARTED,
            });

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
                dispatch({
                    type: actions.global.DATA_FETCHING_FAILED,
                    payload: {
                        error: error?.response?.data ?? error,
                    },
                });
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

    let content = null;

    if (isLoading) {
        content = <Spinner />;
    }

    if (!isLoading && error) {
        content = (
            <Message
                title={error?.error ? error.error : error?.code}
                description={
                    error?.error
                        ? "We couldn't found the user!"
                        : error?.message
                }
            />
        );
    }

    if (!isLoading && !error && state?.publicProfile) {
        content = (
            <React.Fragment>
                <FadeInStagger
                    className="flex flex-col items-center py-8 text-center"
                    faster
                >
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
                </FadeInStagger>

                <UserBlogs />
            </React.Fragment>
        );
    }

    return (
        <AppLayout>
            <div className="mx-auto max-w-[1020px] py-8">
                <div className="container min-h-[50vh]">{content}</div>
            </div>
        </AppLayout>
    );
}
