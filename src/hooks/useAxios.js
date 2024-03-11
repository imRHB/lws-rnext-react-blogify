/* 
    custom fetcher function using axios,
    this function is used to fetch the data from the API,
    not token is needed for fetch
*/

import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(endpoint, type) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/${endpoint}`
                );

                if (response.status === 200) {
                    if (isMounted) {
                        setData(response.data);
                        setError(null);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [endpoint, type]);

    return {
        data,
        isLoading,
        error,
    };
}
