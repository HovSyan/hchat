import { useEffect, useState } from "react"

type FetchFn<T> = () => Promise<T>

export function useFetch<T = any>(fetchFn: FetchFn<T>): [T, false] | [null, true] {
    const [data, setData] = useState<T | null>(null);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        fetchFn().then((data) => {
            setData(data);
            setPending(false)
        })
    }, [fetchFn])

    return pending ? [null, true] : [data!, false];
}