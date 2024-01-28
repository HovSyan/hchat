import { useEffect } from 'react';

export default function useTimeout(cb: () => unknown, time?: number) {
    useEffect(() => {
        const cleanup = setTimeout(cb, time);
        return () => clearTimeout(cleanup);
    }, []);
}