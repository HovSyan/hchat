import { ReactElement, ReactNode, useEffect, useState } from 'react';

export type FetchProps<T> = {
    fetchFn: () => Promise<T>
    onLoading?: ReactElement,
    onError?: ReactElement,
    onSuccess?: (data: T) => unknown,
    children: ReactNode
}

export default function Fetch<T>({ fetchFn, onLoading, onError, onSuccess, children }: FetchProps<T>) {
    const setData = useState<T | null>(null)[1];
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchFn()
            .then((data) => {
                onSuccess?.(data);
                setData(data);
                return data;
            })
            .catch((e) => {
                setError(e);
                throw e;
            })
            .finally(() => setLoading(false));
    }, [fetchFn, onSuccess]);
    
    if (error) {
        return onError || <></>;
    }

    if (loading) {
        return onLoading || <></>;
    }

    return <>{children}</>;
}