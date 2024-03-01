import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import BlogDetails from "./pages/BlogDetails";
import CreateBlogPage from "./pages/CreateBlog";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import AuthProvider from "./provider/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/create-blog"
                            element={<CreateBlogPage />}
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/blogs/:blogId" element={<BlogDetails />} />

                    <Route path="/products" element={<ProductList />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}
