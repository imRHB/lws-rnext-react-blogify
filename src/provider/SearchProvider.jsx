import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import { actions } from "../actions";
import { searchInitialState } from "../constant";
import { SearchContext } from "../context";
import { searchReducer } from "../reducers/searchReducer";

export default function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");

    const [state, dispatch] = useReducer(searchReducer, searchInitialState);

    console.log(!state?.query);

    useEffect(() => {
        async function searchBlogs() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${
                        state?.query
                    }`
                );

                if (response.status === 200) {
                    dispatch({
                        type: actions.search.SEARCH_BLOGS,
                        payload: {
                            blogs: response.data.data,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (state?.query) searchBlogs();
        else
            dispatch({
                type: actions.search.SEARCH_BLOGS,
                payload: {
                    blogs: [],
                },
            });
    }, [state?.query]);

    return (
        <SearchContext.Provider
            value={{ state, dispatch, searchQuery, setSearchQuery }}
        >
            {children}
        </SearchContext.Provider>
    );
}
