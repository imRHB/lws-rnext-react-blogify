import { Route, Routes } from "react-router-dom";

import CreateBlogPage from "./pages/CreateBlog";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create-blog" element={<CreateBlogPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
