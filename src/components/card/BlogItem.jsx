import { Link } from "react-router-dom";

export default function BlogItem() {
    return (
        <article>
            <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
            </h3>

            <p className="text-sm text-slate-600">
                by <Link to="/profile">Saad Hasan</Link> <span>·</span> 100
                Likes
            </p>
        </article>
    );
}
