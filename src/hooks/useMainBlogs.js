/* 
    separate function to fetch the main blogs,
    this function is responsible for generating infinity scrolling
*/

import axios from "axios";
import { useEffect, useRef, useState } from "react";

const blogsPerPage = 4;

export default function useMainBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(
                    `http://localhost:3000/blogs?limit=${blogsPerPage}&page=${page}`
                );
                const data = response.data;

                if (data.blogs.length === 0) {
                    setHasMore(false);
                } else {
                    setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
                    setPage((prevPage) => prevPage + 1);
                }
            } catch (error) {
                console.error(error);
                setError(error);
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchBlogs();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasMore, page]);

    return { blogs, loaderRef, hasMore, isLoading, error };
}
