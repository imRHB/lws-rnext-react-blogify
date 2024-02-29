import { useEffect, useRef, useState } from "react";

const productsPerPage = 10;

export default function ProductList() {
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

    console.log(products);

    return (
        <div className="container">
            <div className="py-12">Product List</div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="px-8 py-6 space-y-4 border-2 rounded-xl bg-slate-950 border-slate-900"
                    >
                        <h2>Title</h2>
                        <p>Description</p>
                    </div>
                ))}
            </div>

            {hasMore ? (
                <div
                    ref={loaderRef}
                    className="flex items-center justify-center h-24 bg-slate-900"
                >
                    <p className="text-xl font-bold">fetching products...</p>
                </div>
            ) : (
                <div className="flex items-center justify-center h-24 bg-slate-900">
                    <p className="text-xl font-bold">No more products!</p>
                </div>
            )}
        </div>
    );
}
