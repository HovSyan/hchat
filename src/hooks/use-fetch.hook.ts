import { useEffect, useState } from 'react';

type FetchFn<T> = () => Promise<T>;

export function useFetch<T = unknown>(
    fetchFn: FetchFn<T>,
): [T, false] | [null, true] {
    const [data, setData] = useState<T | null>(null);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        let canceled = false;
        fetchFn().then((data) => {
            if (canceled) return;
            setData(data);
            setPending(false);
        });

        return () => {
            canceled = true;
        };
    }, [fetchFn]);

    return pending ? [null, true] : [data as T, false];
}
