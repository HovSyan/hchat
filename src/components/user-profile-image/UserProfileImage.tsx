import { IUser } from '../../models/user.model';
import userService from '../../services/user.service';
import { useCallback, useState } from 'react';
import Fetch from '../fetch/Fetch';

import './UserProfileImage.scss';

export type UserProfileImageProps = {
    userId: IUser['id'];
};

export default function UserProfileImage({ userId }: UserProfileImageProps) {
    const getUserFn = useCallback(() => userService.getUser(userId), [userId]);
    const [user, setUser] = useState<IUser | undefined>();

    if (user && !user.avatar) {
        return <span>{user.nickname.slice(0, 1)}</span>;
    }

    const src = userService.getAvatarUrl(user?.avatar);
    const alt = user ? user.nickname : 'Profile image';
    return <Fetch
        fetchFn={getUserFn}
        onSuccess={setUser}
    >
        <img className='user-profile-image' src={src} alt={alt} />
    </Fetch>;
}
