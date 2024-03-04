import { Link } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import useProducts from "../hooks/useProducts";

export default function ProductList() {
    const { products, loaderRef, hasMore } = useProducts();

    return (
        <AppLayout>
            <div className="container">
                <div className="grid grid-cols-1 gap-8 py-8">
                    {/* card */}
                    <Link
                        to="/products"
                        className="relative grid grid-cols-2 space-y-6 border rounded-lg"
                    >
                        <img
                            src={`${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/blog/thumbnail-1708765297564-606798153.png`}
                            className="rounded-tl-lg"
                        />

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Lorem ipsum dolor sit.
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Dicta beatae, omnis
                                    impedit in, amet cupiditate distinctio
                                    delectus eveniet eum dolores corporis veniam
                                    nihil asperiores, porro tempora ex ab
                                    commodi? Sapiente?
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* user photo */}
                                <Link to="/profile">
                                    <img
                                        src={`https://picsum.photos/200`}
                                        className="rounded-full size-12"
                                    />
                                </Link>

                                <div>
                                    {/* user name */}
                                    <Link to="/profile">
                                        <h4 className="text-lg font-semibold">
                                            Jane Doe
                                        </h4>
                                    </Link>
                                    <h6>March 2, 2024</h6>
                                </div>
                            </div>

                            <div
                                className="absolute top-0 p-2 rounded-full right-4 hover:bg-slate-800"
                                onClick={() => console.log("option clicked")}
                            >
                                {/* gear icon */}
                                ⚙️
                            </div>
                        </div>
                    </Link>

                    {/* chatgpt */}
                    <Link
                        to="/product-id"
                        className="relative grid grid-cols-2 space-y-6 border rounded-lg"
                        /* onClick={(e) => {
                        if (
                            e.target.tagName !== "IMG" &&
                            e.target.tagName !== "H4"
                        ) {
                            e.stopPropagation();
                        }
                    }} */
                    >
                        <img
                            src={`${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/blog/thumbnail-1708765297564-606798153.png`}
                            className="rounded-tl-lg"
                        />

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Lorem ipsum dolor sit.
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Dicta beatae, omnis
                                    impedit in, amet cupiditate distinctio
                                    delectus eveniet eum dolores corporis veniam
                                    nihil asperiores, porro tempora ex ab
                                    commodi? Sapiente?
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* user photo */}
                                <Link to="/user">
                                    <img
                                        src="https://picsum.photos/200"
                                        className="rounded-full size-12"
                                        alt="User"
                                    />
                                </Link>

                                <div>
                                    {/* user name */}
                                    <Link to="/user">
                                        <h4 className="text-lg font-semibold">
                                            Jane Doe
                                        </h4>
                                    </Link>
                                    <h6>March 2, 2024</h6>
                                </div>
                            </div>

                            <div
                                className="absolute top-0 p-2 rounded-full right-4 hover:bg-slate-800"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevents default action of the link
                                    e.stopPropagation(); // Stops event propagation to parent elements
                                    console.log("option clicked");
                                }}
                            >
                                {/* gear icon */}
                                ⚙️
                            </div>
                        </div>
                    </Link>
                </div>

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
                        <p className="text-xl font-bold">
                            fetching products...
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-24 bg-slate-900">
                        <p className="text-xl font-bold">No more products!</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
