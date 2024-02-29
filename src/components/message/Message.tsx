import { IMessage } from '../../models/message.model';
import userService from '../../services/user.service';
import UserProfileImage from '../user-profile-image/UserProfileImage';

import './Message.scss';

export type MessageProps = {
    msg: IMessage;
};

export default function Message({ msg }: MessageProps) {
    const className = `message ${msg.created_by === userService.currentUser?.id ? 'message--me' : ''}`;
    return (
        <div className={className}>
            <div className="message__sender">
                <UserProfileImage userId={msg.created_by} />
            </div>
            <span className="message__text">{msg.text}</span>
        </div>
    );
}
