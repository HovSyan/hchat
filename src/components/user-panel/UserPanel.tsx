import { memo, useContext } from 'react';
import ApplicationContext from '../../contexts/app-context';
import { IUser } from '../../models/user.model';
import userService from '../../services/user.service';
import UserProfileImage from '../user-profile-image/UserProfileImage';

export type UserPanelProps = {
    selectedUser: IUser;
}

function UserPanel() {
    const { selectedUser } = useContext(ApplicationContext);
    return <aside className="user-info">
        <UserProfileImage userId={selectedUser.id} />
        <span className='user-info__nickname'>{selectedUser.nickname}</span>
        {selectedUser.id === userService.currentUser?.id && <span className='user-info__me'>This is you</span>}
    </aside>;
}

export default memo(UserPanel);