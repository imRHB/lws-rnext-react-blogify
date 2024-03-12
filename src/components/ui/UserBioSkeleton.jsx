export default function UserBioSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-3 animate-pulse">
            <div className="w-full h-4 rounded-full md:w-11/12 bg-slate-800" />
            <div className="w-full h-4 rounded-full md:w-3/4 bg-slate-800" />
            <div className="w-3/4 h-4 rounded-full md:w-4/5 bg-slate-800" />
        </div>
    );
}
