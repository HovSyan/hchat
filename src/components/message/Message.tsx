import { useContext } from 'react';
import { IMessage } from '../../models/message.model';
import userService from '../../services/user.service';
import UserProfileImage from '../user-profile-image/UserProfileImage';

import './Message.scss';
import appContext from '../../contexts/app-context';

export type MessageProps = {
    msg: IMessage;
};

export default function Message({ msg }: MessageProps) {
    const { selectedUser, setSelectedUser } = useContext(appContext);
    const className = `message ${msg.created_by === userService.currentUser?.id ? 'message--me' : ''}`;

    const onSenderClick = () => {
        if (selectedUser.id === msg.created_by) return;

        const id = msg.created_by;
        userService.getUser(id).then((user) => user && setSelectedUser(user));
    };

    return (
        <div className={className}>
            <div onClick={onSenderClick}
                className="message__sender">
                <UserProfileImage userId={msg.created_by} />
            </div>
            <span className="message__text">{msg.text}</span>
        </div>
    );
}
