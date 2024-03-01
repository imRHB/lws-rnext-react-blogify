import { useEffect, useRef, useState } from "react";

const productsPerPage = 10;

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
                    productsPerPage * page
                }`
            );
            const data = await response.json();

            if (data.products.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...data.products,
                ]);
                setPage((prevPage) => prevPage + 1);
            }
        };

        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchProducts();
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

    return { products, loaderRef, hasMore };
};

export default useProducts;
