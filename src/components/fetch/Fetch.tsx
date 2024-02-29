import { ReactElement, ReactNode, useEffect, useState } from 'react';

export type FetchProps<T> = {
    fetchFn: () => Promise<T>
    loadingElement?: ReactElement,
    errorElement?: ReactElement,
    onLoading?: () => unknown,
    onError?: (error: unknown) => unknown,
    onSuccess?: (data: T) => unknown,
    children: ReactNode
}

export default function Fetch<T>({ fetchFn, onLoading, onError, onSuccess, errorElement, loadingElement, children }: FetchProps<T>) {
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
            })
            .finally(() => setLoading(false));
    }, [fetchFn, onSuccess]);

    useEffect(() => {
        if (error) {
            onError?.(error);
        } else if (loading) {
            onLoading?.();
        }
    }, [error, loading]);
    
    if (error) {
        return errorElement || <></>;
    }

    if (loading) {
        return loadingElement || <></>;
    }

    return <>{children}</>;
}