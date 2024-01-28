import { useEffect } from 'react';

export default function useSyncWithService<T extends object, K extends keyof T>(service: T, serviceProp: K, componentProp: T[K]) {
    const reset = () => {
        'reset' in service && typeof service.reset === 'function' && service.reset();
    };

    useEffect(() => {
        service[serviceProp] = componentProp;
        return reset;
    }, [service, serviceProp, componentProp]);
}