import { memo, useContext } from 'react';
import ApplicationContext from '../../contexts/app-context';
import { IUser } from '../../models/user.model';
import userService from '../../services/user.service';
import UserProfileImage from '../user-profile-image/UserProfileImage';

import './UserPanel.scss';

export type UserPanelProps = {
    selectedUser: IUser;
}

function UserPanel() {
    const { selectedUser } = useContext(ApplicationContext);
    return <aside className="user-panel">
        <div className='user-panel__img'>
            <UserProfileImage userId={selectedUser.id}/>
        </div>
        <span className='user-panel__nickname'>{selectedUser.nickname}</span>
        {selectedUser.id === userService.currentUser?.id && <span className='user-panel__me'><i>(This is you)</i></span>}
    </aside>;
}

export default memo(UserPanel);