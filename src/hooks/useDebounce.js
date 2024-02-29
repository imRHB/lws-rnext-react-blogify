import { useEffect, useRef } from "react";

export default function useDebounce(callback, delay) {
    const timeoutIdRef = useRef(null);

    /* only for clean-up */
    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    /* execute the callback function after delay time */
    const debouncedCallback = (...arg) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            callback(...arg);
        }, delay);
    };

    return debouncedCallback;
}
