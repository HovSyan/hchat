import { ReactNode, useCallback } from 'react';
import userService from '../../services/user.service';
import Error from '../error/Error';
import localStorageService from '../../services/local-storage.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Fetch from '../fetch/Fetch';
import { AxiosError } from 'axios';
import { IUser } from '../../models/user.model';

export type UserGuardProps = {
    children: ReactNode;
}

export default function UserGuard({ children }: UserGuardProps) {
    const navigate = useNavigate();

    const onNoUserFound = () => {
        localStorageService.removeUserId();
        navigate('/login');
    };

    const onGetUserError = useCallback((error: unknown) => {
        if (error instanceof AxiosError && error.code === AxiosError.ERR_NETWORK) return;
        onNoUserFound();
    }, []);

    const onGetUserSuccess = useCallback((user: IUser | null | undefined) => {
        if (user) {
            userService.currentUser = user;
            return;
        }

        onNoUserFound();
    }, []);

    return <Fetch 
        fetchFn={getCurrentUser}
        errorElement={<Error />}
        loadingElement={<h1>Global loading</h1>}
        onError={onGetUserError}
        onSuccess={onGetUserSuccess}
    >{children}</Fetch>;
}

const getCurrentUser = async () => {
    const userId = localStorageService.getUserId();
    const user = await (userId === null ? null : userService.getUser(userId));

    return user;
};