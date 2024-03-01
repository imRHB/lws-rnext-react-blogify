import axios from "axios";
import { useEffect, useRef, useState } from "react";

const blogsPerPage = 4;

export default function useBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchBlogs = async () => {
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

    return { blogs, loaderRef, hasMore };
}