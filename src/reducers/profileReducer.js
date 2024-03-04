import { actions } from "../actions";

export const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING_STARTED: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case actions.profile.USER_SIGNED_IN: {
            return {
                ...state,
                user: action.payload.user,
                favouriteBlogs: action.payload.favouriteBlogs,
            };
        }

        case actions.profile.FETCH_USER_PROFILE: {
            return {
                ...state,
                blogs: action.payload.blogs,
            };
        }

        case actions.profile.UPDATE_USER_PROFILE: {
            return {
                ...state,
                user: action.payload.user,
            };
        }

        case actions.profile.USER_SIGNED_OUT: {
            return {
                ...state,
                user: null,
                blogs: [],
                favouriteBlogs: [],
            };
        }

        case actions.profile.DATA_FETCHING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                blogs: action.payload.blogs,
            };
        }

        case actions.profile.DATA_FETCHING_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }

        default:
            return state;
    }
};
