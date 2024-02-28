import BlogContents from "../components/blog/BlogContents";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

export default function HomePage() {
    return (
        <div>
            <Header />
            <BlogContents />
            <Footer />
        </div>
    );
}
