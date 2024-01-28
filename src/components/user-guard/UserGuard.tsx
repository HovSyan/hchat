import { ReactNode, useCallback } from 'react';
import { useFetch } from '../../hooks/use-fetch.hook';
import userService from '../../services/user.service';
import { IUser } from '../../models/user.model';
import useSyncWithService from '../../hooks/use-sync-with-service.hook';
import Error from '../error/Error';
import localStorageService from '../../services/local-storage.service';
import { useNavigate } from 'react-router-dom';

export type UserGuardProps = {
    children: ReactNode;
}

export default function UserGuard({ children }: UserGuardProps) {
    const navigate = useNavigate();

    const getCurrentUser = useCallback(async () => {
        const userId = localStorageService.getUserId();
        const noUserPromise = Promise.reject('No current user').finally(() => navigate('login'));
        const user = await (userId === null ? null : userService.getUser(userId));
        return user ?? noUserPromise;
    }, []);
    const [user, pending, error] = useFetch<IUser>(getCurrentUser);

    if (error) {
        return <Error />;
    }

    if (pending) {
        return <h1>Global loading</h1>;
    }

    useSyncWithService(userService, 'currentUser', user);

    return <>{children}</>;
}