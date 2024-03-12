export default function BlogContentsSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-11/12 h-8 max-w-4xl rounded-full lg:4/5 bg-slate-800" />

            <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div className="w-20 h-4 rounded-full bg-slate-800" />
                <div className="w-32 h-4 rounded-full bg-slate-800" />
                <div className="w-16 h-4 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center justify-center object-cover w-full rounded-lg md:w-8/12 h-80 md:h-96 bg-slate-800 animate-pulse">
                <svg
                    className="w-10 h-10 text-slate-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>

            <div className="flex items-center justify-center gap-3 animate-pulse">
                <div className="w-20 h-6 rounded-full bg-slate-800" />
                <div className="h-6 rounded-full w-28 bg-slate-800" />
                <div className="w-24 h-6 rounded-full bg-slate-800" />
                <div className="w-16 h-6 rounded-full bg-slate-800" />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-3 animate-pulse">
                <div className="w-5/6 h-4 rounded-full bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-2/3 h-4 rounded-full bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-3/4 h-4 rounded-full bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-2/3 h-4 rounded-lg bg-slate-800" />
                <div className="w-4/5 h-4 rounded-full bg-slate-800" />
                <div className="w-3/4 h-4 rounded-full bg-slate-800" />
            </div>
        </div>
    );
}
