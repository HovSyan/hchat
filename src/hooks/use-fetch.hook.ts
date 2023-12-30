import { useEffect, useState } from 'react';

type FetchFn<T> = () => Promise<T>;
type Error = { message: string };
type FetchResult<T> = [T, false, null] | [null, false, Error] | [null, true, null];

export function useFetch<T = unknown>(fetchFn: FetchFn<T>): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [pending, setPending] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let canceled = false;
        fetchFn().then((data) => {
            if (canceled) return;
            setData(data);
        }).catch((e: unknown) => {
            console.error(e);
            setError({ message: String(e) });
        }).finally(() => {
            setPending(false);
        });

        return () => {
            canceled = true;
        };
    }, [fetchFn]);

    let result: FetchResult<T>;
    if (pending) {
        result = [null, true, null];
    } else if (error) {
        result = [null, false, error];
    } else {
        result = [data as T, false, null];
    }

    return result;
}
