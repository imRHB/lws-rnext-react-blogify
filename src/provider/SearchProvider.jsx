import { useState } from "react";

import { SearchContext } from "../context";

export default function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
}
