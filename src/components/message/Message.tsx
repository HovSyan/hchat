import { IMessage } from '../../models/message.model';
import UserProfileImage from '../user-profile-image/UserProfileImage';

import './Message.scss';

export type MessageProps = {
    msg: IMessage;
};

export default function Message({ msg }: MessageProps) {
    return (
        <div className="message">
            <div className="message__sender">
                <UserProfileImage userId={msg.created_by} />
            </div>
            <span className="message__text">{msg.text}</span>
        </div>
    );
}
