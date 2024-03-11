/* 
    creating a new axios instance,
    adding a few base options
    later it adds extra customizations
 */

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});
