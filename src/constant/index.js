export const profileInitialState = {
    user: null,
    blogs: [],
    favouriteBlogs: [],
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
};
