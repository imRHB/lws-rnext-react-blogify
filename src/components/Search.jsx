import { useContext } from "react";

import { SearchContext } from "../context";
import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";

import { actions } from "../actions";
import magnifyIcon from "/assets/icons/search.svg";

export default function Search() {
    const { setSearchQuery } = useContext(SearchContext);

    const { state, dispatch } = useSearch();
    console.log("search state:", state);

    const debouncedSetSearchTerm = useDebounce((searchValue) => {
        setSearchQuery(searchValue);
        dispatch({
            type: actions.search.SEARCH_QUERY,
            payload: {
                query: searchValue,
            },
        });
    }, 500);

    const handleSearch = (evt) => {
        debouncedSetSearchTerm(evt.target.value);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative md:min-w-[350px]">
                <div className="absolute inset-y-0 left-0 flex items-center px-4 py-3 pointer-events-none">
                    <img src={magnifyIcon} alt="Search" />
                    <span className="sr-only">Search</span>
                </div>

                <input
                    type="text"
                    name="search"
                    placeholder="Search blogs"
                    className="block w-full px-4 py-3 pl-12 transition rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-blue-900/50 bg-slate-900 ring-slate-800"
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
}
