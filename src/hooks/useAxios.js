import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(endpoint) {
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
                    // throw new Error(
                    //     "Something went wrong, data fetching failed! Please try again later!"
                    // );
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
    }, [endpoint]);

    return {
        data,
        isLoading,
        error,
    };
}
