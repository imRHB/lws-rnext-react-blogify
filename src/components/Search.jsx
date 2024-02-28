import magnifyIcon from "/assets/icons/search.svg";

export default function Search() {
    return (
        <div className="relative md:min-w-[350px]">
            <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none">
                <img src={magnifyIcon} alt="Search" />
                <span className="sr-only">Search</span>
            </div>

            <input
                type="text"
                name="search"
                placeholder="Search blogs"
                className="block w-full px-4 py-3 pl-12 transition rounded-lg text-slate-300 bg-slate-900 focus:outline-blue-900/50 focus:bg-transparent"
                //   onChange={handleSearch}
                required
            />
        </div>
    );
}
