import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import { blogInitialState } from "../constant";
import { BlogContext } from "../context";
import useBlogs from "../hooks/useBlogs";
import useProfile from "../hooks/useProfile";
import { blogReducer } from "../reducers/blogReducer";

export default function BlogProvider({ children }) {
    const [popularBlogs, setPopularBlogs] = useState([]);

    const { blogs } = useBlogs();
    const { state: profileState } = useProfile();

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

    const [state, dispatch] = useReducer(blogReducer, {
        ...blogInitialState,
        blogs,
        popularBlogs,
    });

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
}
