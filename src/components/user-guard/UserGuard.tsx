import { ReactNode, useCallback } from 'react';
import userService from '../../services/user.service';
import Error from '../error/Error';
import localStorageService from '../../services/local-storage.service';
import { useNavigate } from 'react-router-dom';
import Fetch from '../fetch/Fetch';

export type UserGuardProps = {
    children: ReactNode;
}

export default function UserGuard({ children }: UserGuardProps) {
    const navigate = useNavigate();

    const getCurrentUser = useCallback(async () => {
        const userId = localStorageService.getUserId();
        try {
            const user = await (userId === null ? null : userService.getUser(userId));

            if (user) {
                return userService.currentUser = user;
            }
        } catch(e) { console.error(e); }

        return Promise.reject('No current user').finally(() => navigate('login'));
    }, []);

    return <Fetch 
        fetchFn={getCurrentUser}
        onError={<Error />}
        onLoading={<h1>Global loading</h1>}
    >{children}</Fetch>;
}