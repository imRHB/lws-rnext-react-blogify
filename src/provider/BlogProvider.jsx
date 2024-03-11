import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import { api } from "../api";
import { blogInitialState } from "../constant";
import { BlogContext } from "../context";
import useProfile from "../hooks/useProfile";
import { blogReducer } from "../reducers/blogReducer";

export default function BlogProvider({ children }) {
    const [popularBlogs, setPopularBlogs] = useState([]);
    // const { blogs, error } = useMainBlogs();
    const { state: profileState } = useProfile();
    const [favouriteBlogs, setFavouriteBlogs] = useState(
        profileState?.favouriteBlogs ?? []
    );

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

    useEffect(() => {
        async function fetchFavouriteBlogs() {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
                );

                if (response.status === 200) {
                    setFavouriteBlogs(response.data.blogs);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (profileState?.user?.id) fetchFavouriteBlogs();
    }, [profileState?.user?.id]);

    const [state, dispatch] = useReducer(blogReducer, {
        ...blogInitialState,
        // blogs,
        popularBlogs,
        // favouriteBlogs: profileState?.user?.id && profileState?.favouriteBlogs,
        favouriteBlogs,
        // error,
    });

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
}
