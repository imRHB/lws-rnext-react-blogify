import { useEffect, useState } from "react";

import { api } from "../api";

export default function useBlogsQuery(limit, page) {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBlogs = async () => {
            try {
                setIsLoading(true);

                const response = await api.get(
                    `http://localhost:3000/blogs?limit=${limit}&page=${page}`
                );

                if (!response.status === 200) {
                    throw new Error(
                        "Something went wrong, data fetching failed! Please try again later!"
                    );
                }

                if (isMounted) {
                    setBlogs(response?.data?.blogs);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();

        return () => {
            isMounted = false;
        };
    }, [limit, page]);

    return {
        blogs,
        isLoading,
        error,
    };
}
