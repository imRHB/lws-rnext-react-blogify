import useProducts from "../hooks/useProducts";

export default function ProductList() {
    const { products, loaderRef, hasMore } = useProducts();

    console.log(products);

    return (
        <div className="container">
            <div className="py-12 text-center">Product List</div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="px-8 py-6 space-y-4 border-2 rounded-xl bg-slate-950 border-slate-900"
                    >
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
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
