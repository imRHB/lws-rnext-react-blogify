import { Link } from "react-router-dom";

import AppLayout from "../components/AppLayout";

export default function NotFoundPage() {
    return (
        <AppLayout authPage="true">
            <div className="container">
                <div className="flex flex-col items-center justify-center min-h-screen py-2 sm:p-8">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-extrabold text-center text-slate-300">
                            404
                        </h2>
                        <p className="text-lg font-semibold text-center text-slate-400">
                            Page not found!
                        </p>

                        <p className="font-semibold text-center">
                            <Link
                                to="/"
                                className="text-indigo-400 hover:text-indigo-500 hover:underline underline-offset-2"
                            >
                                Go to home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
