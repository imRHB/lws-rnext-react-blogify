import axios from "axios";
import { useEffect, useReducer } from "react";

import { actions } from "../actions";
import { searchInitialState } from "../constant";
import { SearchContext } from "../context";
import { searchReducer } from "../reducers/searchReducer";

export default function SearchProvider({ children }) {
    const [state, dispatch] = useReducer(searchReducer, searchInitialState);

    useEffect(() => {
        async function searchBlogs() {
            dispatch({
                type: actions.global.DATA_FETCHING_STARTED,
            });

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
                dispatch({
                    type: actions.search.SEARCH_BLOGS,
                    payload: {
                        blogs: [],
                    },
                });

                dispatch({
                    type: actions.global.DATA_FETCHING_FAILED,
                    payload: {
                        error: error.response.data,
                    },
                });
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
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
}
