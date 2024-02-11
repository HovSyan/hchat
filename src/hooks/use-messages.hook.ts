import { useEffect, useState } from 'react';
import { IRoom } from '../models/room.model';
import { IMessage } from '../models/message.model';
import messagesService from '../services/messages.service';

export default function useMessages(roomId: IRoom['id'] | undefined) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if(!roomId) {
            setMessages([]);
            return;
        }

        messagesService.getMessages(roomId).then(messages => setMessages(messages));
    }, []);

    return messages;
}