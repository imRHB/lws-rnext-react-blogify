import { useContext } from "react";

import { SearchContext } from "../context";

export default function useSearch() {
    return useContext(SearchContext);
}
