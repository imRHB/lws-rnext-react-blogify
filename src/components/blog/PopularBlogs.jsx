import axios from "axios";
import { useEffect, useState } from "react";

import SectionTitle from "../SectionTitle";
import BlogItem from "../card/BlogItem";

export default function PopularBlogs() {
    const [popularBlogs, setPopularBlogs] = useState([]);

    useEffect(() => {
        async function fetchPopularBlogs() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
                );

                if (response.status === 200) {
                    setPopularBlogs(response.data.blogs);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchPopularBlogs();
    }, []);

    console.log(popularBlogs);

    return (
        <section className="sidebar-card">
            <SectionTitle title="Most Popular 👍️" />

            <div className="my-5 space-y-5">
                {popularBlogs.length > 0 &&
                    popularBlogs.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
            </div>
        </section>
    );
}
