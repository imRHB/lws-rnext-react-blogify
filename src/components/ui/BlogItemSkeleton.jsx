export default function BlogItemSkeleton() {
    return (
        <div className="flex flex-col gap-3 overflow-hidden">
            <div className="w-full h-4 rounded-full sm:w-2/3 md:w-11/12 bg-slate-800 animate-pulse" />
            <div className="flex gap-2 animate-pulse">
                <div className="w-6 h-3 rounded-full bg-slate-800" />
                <div className="w-20 h-3 rounded-full bg-slate-800" />
                <div className="w-12 h-3 rounded-full bg-slate-800" />
            </div>
        </div>
    );
}
