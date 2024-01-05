import { FormEvent, useEffect, useRef, useState } from 'react';
import { IRoom } from '../../models/room.model';
import { IMessage } from '../../models/message.model';
import messagesService from '../../services/messages.service';
import Message from '../message/Message';
import ChatInput from '../chat-input/ChatInput';

import './Chat.scss';

export type ChatProps = {
    roomId: IRoom['id'] | undefined;
};

export default function Chat({ roomId }: ChatProps) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messageComponents = messages.length
        ? messages?.map((m) => <Message msg={m} key={m.id} /> ) 
        : <h1 className='chat__no-messages'>No Messages Yet!</h1>;

    // TODO: move to custom hook
    useEffect(() => {
        if (!roomId) {
            setMessages([]);
            return;
        }
        messagesService.getMessages(roomId).then((m) => setMessages(m));
    }, [roomId]);

    const onMessageSubmit = (msg: string) => {
        if(!roomId) return;

        messagesService.sendMessage(roomId, msg);
    };

    return roomId 
        ? <><div className='chat__messages'>{messageComponents}</div>
            <ChatInput onMessageSubmit={onMessageSubmit}/></>
        : <h1 className='chat__no-messages'>Hey champion! Select a room to view the chat!</h1>;
}
