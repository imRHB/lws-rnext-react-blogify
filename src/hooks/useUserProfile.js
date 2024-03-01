import { useContext } from "react";

import { ProfileContext } from "../context";

export default function useUserProfile() {
    return useContext(ProfileContext);
}
