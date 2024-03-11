export default function BlogCardSkeleton() {
    return (
        <div className="flex flex-col w-full p-2 overflow-hidden border-2 rounded-lg md:flex-row border-slate-900">
            <div className="animate-pulse">
                <div className="flex items-center justify-center rounded-md min-w-[340px] h-48 bg-slate-800">
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
            </div>

            <div className="flex flex-col justify-between w-full gap-4 p-6 rounded-lg">
                <div className="space-y-4 animate-pulse">
                    <div className="w-10/12 h-6 rounded-full bg-slate-800" />
                    <div className="space-y-3">
                        <div className="w-3/4 h-4 rounded-full bg-slate-800" />
                        <div className="w-full h-4 rounded-full bg-slate-800 lg:hidden" />
                        <div className="w-11/12 h-4 rounded-full bg-slate-800" />
                    </div>
                </div>

                <div className="flex justify-between animate-pulse">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800" />
                        <div className="flex flex-col justify-center gap-2">
                            <div className="w-20 h-3 rounded-full bg-slate-800" />
                            <div className="w-24 h-3 rounded-full bg-slate-800" />
                        </div>
                    </div>
                    <div className="w-16 h-3 rounded-full bg-slate-800" />
                </div>
            </div>
        </div>
    );
}

/* 

<div className="flex-1 py-1 space-y-4">
                        <div className="h-6 rounded-full bg-slate-200" />
                        <div className="w-2/3 h-6 rounded-full bg-slate-200" />
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-4 col-span-2 rounded-full bg-slate-200" />
                                <div className="h-4 col-span-1 rounded-full bg-slate-200" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-4 rounded-full bg-slate-200" />
                                <div className="h-4 col-span-2 rounded-full bg-slate-200" />
                            </div>
                            <div className="w-10/12 h-4 rounded-full bg-slate-200" />
                        </div>
                    </div>

*/
