import { actions } from "../actions";

export const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING_STARTED: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }

        case actions.blog.DATA_FETCHING_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }

        case actions.blog.FETCH_ALL_BLOGS: {
            return {
                ...state,
                blogs: action.payload.blogs,
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.FETCH_BLOGS_INFINITELY: {
            return {
                ...state,
                blogs: action.payload.blogs,
            };
        }

        case actions.blog.FETCH_FAVORITE_BLOGS: {
            return {
                ...state,
                favouriteBlogs: action.payload.blogs,
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.FETCH_BLOG_BY_ID: {
            return {
                ...state,
                blog: action.payload.blog,
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.TOGGLE_LIKE_BLOG: {
            return {
                ...state,
                blog: action.payload.blog,
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.TOGGLE_FAVOURITE_BLOG: {
            return {
                ...state,
                blog: action.payload.blog,
                isLoading: false,
                error: null,
                // favouriteBlogs: [...state.favouriteBlogs, action.payload.blog],
            };
        }

        case actions.blog.CREATE_BLOG: {
            return {
                ...state,
                blogs: [...state.blogs, action.payload.blog],
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.UPDATE_BLOG: {
            const oldBlogs = state.blogs.filter(
                (blog) => blog.id !== action.payload.blogId
            );

            return {
                ...state,
                blog: action.payload.blog,
                blogs: [...oldBlogs, action.payload.blog],
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.DELETE_BLOG: {
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

        case actions.blog.POST_COMMENT: {
            return {
                ...state,
                blog: action.payload.blog,
                isLoading: false,
                error: null,
            };
        }

        case actions.blog.DELETE_COMMENT: {
            return {
                ...state,
                blog: action.payload.blog,
                isLoading: false,
                error: null,
            };
        }

        default:
            return state;
    }
};
