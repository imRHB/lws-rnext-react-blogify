import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Field from "../components/form/Field";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(formData) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                formData
            );

            if (response.status === 200) {
                const { token, user } = response.data;

                if (token) {
                    const accessToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    setAuth({ user, accessToken, refreshToken });

                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            setError("root.manual", {
                type: "manual",
                message: error?.message,
            });
        }
    }

    return (
        <section className="container">
            <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                <h2 className="mb-6 text-2xl font-bold">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Field label="Email" error={errors.email}>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="mail@example.com"
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
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
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </Field>

                    <p>{errors?.root?.manual?.message}</p>

                    <div className="mt-6" />
                    <button
                        type="submit"
                        className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
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
