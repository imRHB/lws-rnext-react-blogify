import { actions } from "../actions";

export const searchReducer = (state, action) => {
    switch (action.type) {
        case actions.search.SEARCH_QUERY: {
            return {
                ...state,
                query: action.payload.query,
            };
        }

        case actions.search.SEARCH_BLOGS: {
            return {
                ...state,
                blogs: action.payload.blogs,
            };
        }

        default:
            return state;
    }
};
