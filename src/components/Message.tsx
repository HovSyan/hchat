import { IMessage } from "../models/message.model"
import UserProfileImage from "./UserProfileImage"

export type MessageProps = {
    msg: IMessage
}

export default function Message({ msg }: MessageProps) {
    return <div className="message">
        <div className="message__sender">
            <UserProfileImage userId={msg.created_by} />
        </div>
        <span className="message__text">{msg.text}</span>
    </div>
}