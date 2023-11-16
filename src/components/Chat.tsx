import { useEffect, useState } from 'react';
import { IRoom } from '../models/room.model';
import { IMessage } from '../models/message.model';
import messagesService from '../services/messages.service';
import Message from './Message';

export type ChatProps = {
    roomId: IRoom['id'] | undefined;
};

export default function Chat({ roomId }: ChatProps) {
    console.log('Chat rendered');
    const [messages, setMessages] = useState<IMessage[] | undefined>(undefined);

    useEffect(() => {
        if (!roomId) {
            setMessages(undefined);
            return;
        }
        messagesService.getMessages(roomId).then((m) => setMessages(m));
    }, [roomId]);

    if (!roomId) {
        return <h1>Loading...</h1>;
    }

    if (!messages || messages.length === 0) {
        return <h1>No messages yet!</h1>;
    }

    return (
        <>
            {messages.map((m) => (
                <Message msg={m} key={m.id} />
            ))}
        </>
    );
}
