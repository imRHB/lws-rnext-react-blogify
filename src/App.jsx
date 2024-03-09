import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import BlogDetailsPage from "./pages/BlogDetails";
import CreateBlogPage from "./pages/CreateBlog";
import EditBlogPage from "./pages/EditBlog";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import PublicProfilePage from "./pages/PublicProfile";
import RegisterPage from "./pages/Register";
import AuthProvider from "./provider/AuthProvider";
import BlogProvider from "./provider/BlogProvider";
import ProfileProvider from "./provider/ProfileProvider";
import SearchProvider from "./provider/SearchProvider";

export default function App() {
    return (
        <AuthProvider>
            <SearchProvider>
                <ProfileProvider>
                    <BlogProvider>
                        <Router>
                            {/* <Header /> */}
                            <Routes>
                                <Route
                                    path="/profile/:userId"
                                    element={<PublicProfilePage />}
                                />

                                <Route element={<PrivateRoute />}>
                                    <Route
                                        path="/create-blog"
                                        element={<CreateBlogPage />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<ProfilePage />}
                                        exact
                                    />
                                    <Route
                                        path="/blogs/:blogId/edit"
                                        element={<EditBlogPage />}
                                    />
                                </Route>
                                <Route
                                    path="/blogs/:blogId"
                                    element={<BlogDetailsPage />}
                                    exact
                                />
                                <Route path="/" element={<HomePage />} exact />

                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/register"
                                    element={<RegisterPage />}
                                />

                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                            {/* <Footer /> */}
                        </Router>
                    </BlogProvider>
                </ProfileProvider>
            </SearchProvider>

            <ToastContainer
                position="bottom-right"
                theme="dark"
                toastStyle={{
                    backgroundColor: "#0F172A",
                    border: "1px solid rgb(71 85 105 / 0.5)",
                }}
                stacked
                hideProgressBar
            />
        </AuthProvider>
    );
}
