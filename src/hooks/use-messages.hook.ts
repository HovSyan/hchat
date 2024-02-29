import { useEffect, useState } from 'react';
import { IRoom } from '../models/room.model';
import { IMessage } from '../models/message.model';
import messagesService from '../services/messages.service';
import messagesSocketService from '../services/messages-socket.service';

export default function useMessages(roomId: IRoom['id'] | undefined) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if(!roomId) {
            setMessages([]);
            return;
        }

        messagesService.getMessages(roomId).then(messages => setMessages(messages));
        messagesSocketService.onMessage.subscribe((newMessage) => setMessages((current) => [...current, newMessage]));
    }, [roomId]);

    return messages;
}