import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { actions } from "../actions";
import Field from "../components/form/Field";
import AppLayout from "../components/layout/AppLayout";
import Error from "../components/ui/Error";
import Spinner from "../components/ui/Spinner";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const { setAuth } = useAuth();
    const { state, dispatch } = useProfile();

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setError,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(formData) {
        dispatch({
            type: actions.global.DATA_FETCHING_STARTED,
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                formData
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                const { favourites, ...rest } = user;

                if (token) {
                    const accessToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    dispatch({
                        type: actions.profile.USER_SIGNED_IN,
                        payload: {
                            user: rest,
                            favouriteBlogs: favourites,
                        },
                    });

                    setAuth({ user, accessToken, refreshToken });

                    navigate(from);
                }
            }
        } catch (error) {
            dispatch({
                type: actions.global.DATA_FETCHING_FAILED,
                payload: {
                    error,
                },
            });

            /* setError("root.manual", {
                type: "manual",
                message: error?.message,
            }); */
        }
    }

    useEffect(() => {
        if (state?.user) navigate("/");
    }, [navigate, state?.user]);

    useEffect(() => {
        return () => {
            dispatch({
                type: actions.global.DATA_FETCHING_FAILED,
                payload: {
                    error: null,
                },
            });
        };
    }, [dispatch]);

    return (
        <AppLayout authPage="true">
            <section className="container relative">
                <div className="flex flex-col items-center justify-center min-h-screen py-2 sm:p-8">
                    <div className="w-full max-w-md sm:max-w-lg mx-auto bg-[#030317] rounded-md divide-slate-900 ring-2 ring-slate-900 divide-y-2">
                        <div className="p-4 space-y-4 sm:px-8 sm:py-6">
                            <h2 className="text-2xl font-bold text-center uppercase text-slate-200">
                                Login
                            </h2>
                            <p className="text-center text-slate-300">
                                Login to your React Blogify account
                            </p>
                        </div>

                        <div className="p-4 sm:px-8 sm:py-6">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <Field label="Email" error={errors.email}>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message:
                                                    "Invalid email address",
                                            },
                                        })}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="mail@example.com"
                                        className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                                    />
                                </Field>

                                <Field label="Password" error={errors.password}>
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 4,
                                                message: "Minimum 4 characters",
                                            },
                                        })}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="* * * * * *"
                                        className="w-full px-4 py-3 bg-transparent border-2 rounded-md border-white/20 focus:bg-slate-900/50 focus:outline-none focus:border-indigo-500 text-slate-300"
                                    />
                                </Field>

                                <Error
                                    message={
                                        state?.error?.response?.data?.error
                                    }
                                />

                                <button
                                    type="submit"
                                    className="w-full px-6 py-2 text-lg text-white transition-all duration-200 bg-indigo-600 rounded-md sm:py-3 ring-1 ring-indigo-700 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-900 disabled:ring-indigo-950"
                                    disabled={state?.isLoading}
                                >
                                    {state?.isLoading ? <Spinner /> : "Login"}
                                </button>
                            </form>
                        </div>

                        <div className="p-4 space-y-4 sm:px-8 sm:py-6">
                            <p className="text-center text-slate-300">
                                Don&apos;t have an account?
                            </p>
                            <p className="text-center text-slate-300">
                                <Link
                                    to="/register"
                                    className="text-indigo-400 hover:text-indigo-500 hover:underline underline-offset-2"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] -z-50" />
        </AppLayout>
    );
}

/* 

<FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="mail@example.com"
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="* * * * * *"
                        />

                        <button
                            type="submit"
                            className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Login
                        </button>
                    </form>
                </FormProvider>

*/
