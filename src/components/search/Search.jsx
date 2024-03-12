import React, { useEffect, useState } from "react";

import { actions } from "../../actions";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../../hooks/useSearch";
import Portal from "../Portal";
import FadeIn from "../framer/FadeIn";
import ModalLayout from "../layout/ModalLayout";
import BlogCardSkeleton from "../ui/BlogCardSkeleton";
import Message from "../ui/Message";
import SearchResultItem from "./SearchResultItem";

import closeIcon from "/assets/icons/close.svg";
import magnifyIcon from "/assets/icons/search.svg";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);

    const { state, dispatch } = useSearch();

    const debouncedSetSearchTerm = useDebounce((searchValue) => {
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

    const openModal = () => {
        setIsOpen(true);
    };

    /* auto blur the dummy search input in the header when the modal is close */
    const closeModal = () => {
        setIsOpen(false);
        document.getElementById("search-box").blur();

        dispatch({
            type: actions.search.SEARCH_QUERY,
            payload: {
                query: "",
            },
        });

        dispatch({
            type: actions.search.SEARCH_BLOGS,
            payload: {
                blogs: [],
            },
        });
    };

    /* auto focus the search input on the actual search input when the search modal is open */
    useEffect(() => {
        if (isOpen) {
            document.getElementById("search").focus();
        }
    }, [isOpen]);

    return (
        <div className="flex items-center justify-center">
            <div className="relative md:min-w-[350px]">
                <div className="absolute inset-y-0 left-0 flex items-center px-4 py-3 pointer-events-none">
                    <img src={magnifyIcon} alt="Search" />
                    <span className="sr-only">Search</span>
                </div>

                <input
                    type="text"
                    id="search-box"
                    name="search-box"
                    placeholder="Search blogs..."
                    className="block w-full px-4 py-3 pl-12 transition bg-transparent rounded-lg ring-2 text-slate-300 focus:outline-none focus:bg-slate-950/20 focus:ring-2 focus:ring-blue-900/50 ring-slate-800"
                    onFocus={openModal}
                    onBlur={isOpen ? null : closeModal}
                />
            </div>

            <Portal>
                <ModalLayout isOpen={isOpen} onClose={closeModal}>
                    <FadeIn className="relative w-6/12 p-6 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
                        <div className="space-y-4">
                            <div className="flex justify-between gap-6">
                                <h3 className="text-xl font-bold text-slate-400">
                                    Search for your desire blogs
                                </h3>

                                <div className="absolute flex items-center gap-4 right-4 top-4">
                                    <kbd className="px-3 py-0.5 ring-2 rounded text-slate-400 ring-slate-300">
                                        Esc
                                    </kbd>

                                    <img
                                        src={closeIcon}
                                        alt="Close"
                                        className="w-8 h-8 cursor-pointer"
                                        onClick={closeModal}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center px-4 py-3 pl-6 pointer-events-none">
                                    <img src={magnifyIcon} alt="Search" />
                                    <span className="sr-only">Search</span>
                                </div>

                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Search blogs..."
                                    className="block w-full px-4 py-3 transition bg-transparent rounded-lg pl-14 ring-2 text-slate-300 focus:outline-none focus:bg-slate-950/20 focus:ring-2 focus:ring-blue-900/50 ring-slate-800"
                                    onChange={handleSearch}
                                    onFocus={openModal}
                                    onBlur={isOpen ? null : closeModal}
                                />
                            </div>
                        </div>

                        {/* search results */}
                        <div>
                            {!state?.query ? (
                                <div className="flex flex-col items-center justify-center gap-2 pt-6 pb-4">
                                    <Message
                                        title="Search blogs"
                                        description="Start typing to search blogs"
                                    />
                                </div>
                            ) : (
                                <React.Fragment>
                                    {state?.isLoading ? (
                                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                                            <BlogCardSkeleton size="sm" />
                                        </div>
                                    ) : (
                                        <React.Fragment>
                                            <h3 className="mt-6 font-bold text-slate-300">
                                                Search Results (
                                                {state?.blogs?.length})
                                            </h3>

                                            <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                                                {state?.blogs?.length > 0 ? (
                                                    state?.blogs?.map(
                                                        (blog) => (
                                                            <FadeIn
                                                                key={blog.id}
                                                            >
                                                                <SearchResultItem
                                                                    blog={blog}
                                                                />
                                                            </FadeIn>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center gap-2 pt-6 pb-4">
                                                        <Message
                                                            title="No blogs found"
                                                            description={`We could not find any blogs with "${state?.query}", try searching with different keyword`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </FadeIn>
                </ModalLayout>
            </Portal>
        </div>
    );
}
