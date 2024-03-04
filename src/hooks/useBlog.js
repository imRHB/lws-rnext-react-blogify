import { useContext } from "react";

import { BlogContext } from "../context";

export default function useBlog() {
    return useContext(BlogContext);
}
