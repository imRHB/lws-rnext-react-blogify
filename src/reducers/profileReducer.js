import { actions } from "../actions";

export const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING_STARTED: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }

        case actions.profile.DATA_FETCHING_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }

        case actions.profile.USER_SIGNED_IN: {
            return {
                ...state,
                user: action.payload.user,
                favouriteBlogs: action.payload.favouriteBlogs,
                isLoading: false,
                error: null,
            };
        }

        case actions.profile.FETCH_USER_PROFILE: {
            return {
                ...state,
                blogs: action.payload.blogs,
                isLoading: false,
                error: null,
            };
        }

        case actions.profile.UPDATE_USER_PROFILE: {
            return {
                ...state,
                user: action.payload.user,
                isLoading: false,
                error: null,
            };
        }

        case actions.profile.DELETE_BLOG: {
            const updatedBlogs = state.blogs.filter(
                (blog) => blog.id !== action.payload.blogId
            );

            return {
                ...state,
                blogs: updatedBlogs,
                isLoading: false,
                error: null,
            };
        }

        case actions.profile.USER_SIGNED_OUT: {
            return {
                ...state,
                user: null,
                blogs: [],
                favouriteBlogs: [],
                isLoading: false,
                error: null,
            };
        }

        case actions.profile.FETCH_PUBLIC_PROFILE: {
            return {
                ...state,
                publicProfile: action.payload.publicProfile,
                isLoading: false,
                error: null,
            };
        }

        default:
            return state;
    }
};
