import BlogCardSkeleton from "./BlogCardSkeleton";

export default function UserBlogsSkeleton() {
    return (
        <div className="flex flex-col justify-center gap-5 animate-pulse">
            <div className="w-48 h-6 rounded-full bg-slate-800" />

            <BlogCardSkeleton />
        </div>
    );
}
