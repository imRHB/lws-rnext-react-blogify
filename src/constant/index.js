export const profileInitialState = {
    user: null,
    blogs: [],
    favouriteBlogs: [],
    publicProfile: null,
    isLoading: false,
    error: null,
};

export const blogInitialState = {
    blogs: [],
    popularBlogs: [],
    favouriteBlogs: [],
    blog: null,
    isLoading: false,
    error: null,
};

export const searchInitialState = {
    query: "",
    blogs: [],
    isLoading: false,
    error: null,
};
