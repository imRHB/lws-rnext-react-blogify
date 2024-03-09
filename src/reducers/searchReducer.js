import { actions } from "../actions";

export const searchReducer = (state, action) => {
    switch (action.type) {
        case actions.search.DATA_FETCHING_STARTED: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }

        case actions.search.DATA_FETCHING_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }

        case actions.search.SEARCH_QUERY: {
            return {
                ...state,
                query: action.payload.query,
                isLoading: false,
                error: null,
            };
        }

        case actions.search.SEARCH_BLOGS: {
            return {
                ...state,
                blogs: action.payload.blogs,
                isLoading: false,
                error: null,
            };
        }

        default:
            return state;
    }
};
