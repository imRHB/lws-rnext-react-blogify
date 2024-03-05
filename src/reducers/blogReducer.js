import { actions } from "../actions";

export const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.FETCH_ALL_BLOGS: {
            return {
                ...state,
                blogs: action.payload.blogs,
            };
        }

        case actions.blog.FETCH_BLOG_BY_ID: {
            return {
                ...state,
                blog: action.payload.blog,
            };
        }

        case actions.blog.TOGGLE_LIKE_BLOG: {
            return {
                ...state,
                blog: action.payload.blog,
            };
        }

        case actions.blog.TOGGLE_FAVOURITE_BLOG: {
            return {
                ...state,
                blog: action.payload.blog,
                // favouriteBlogs: [...state.favouriteBlogs, action.payload.blog],
            };
        }

        case actions.blog.POST_COMMENT: {
            return {
                ...state,
                blog: action.payload.blog,
            };
        }

        case actions.blog.CREATE_BLOG: {
            return {
                ...state,
                blogs: [...state.blogs, action.payload.blog],
            };
        }

        case actions.blog.DELETE_BLOG: {
            const updatedBlogs = state.blogs.filter(
                (blog) => blog.id !== action.payload.blogId
            );

            return {
                ...state,
                blogs: updatedBlogs,
            };
        }

        default:
            return state;
    }
};
