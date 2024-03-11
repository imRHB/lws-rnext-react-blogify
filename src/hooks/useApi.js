/* 
    custom hook that extends the axios custom config,
    also intercepts the request and response to generate
    new access token using the refresh token from auth
*/

import axios from "axios";
import { useEffect } from "react";

import { api } from "../api";
import useAuth from "./useAuth";

const useApi = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken;

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error) => {
                console.error("REQUEST_ERROR:", error);
                Promise.reject(error);
            }
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;

                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken }
                        );
                        const { accessToken } = response.data;
                        setAuth({ ...auth, accessToken });

                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return axios(originalRequest);
                    } catch (error) {
                        console.error("REFRESH_TOKEN_ERROR:", error);
                        throw error;
                    }
                } else {
                    console.error("API_ERROR:", error);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, setAuth]);

    return { api };
};

export default useApi;
