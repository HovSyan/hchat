import { FormEvent, useEffect, useRef, useState } from 'react';
import { IRoom } from '../../models/room.model';
import { IMessage } from '../../models/message.model';
import messagesService from '../../services/messages.service';
import Message from '../message/Message';

import './Chat.scss';

export type ChatProps = {
    roomId: IRoom['id'] | undefined;
};

export default function Chat({ roomId }: ChatProps) {
    const [messages, setMessages] = useState<IMessage[] | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageComponents = messages?.length
        ? messages?.map((m) => <Message msg={m} key={m.id} /> ) 
        : <h1 className='chat__no-messages'>No Messages Yet!</h1>;

    useEffect(() => {
        if (!roomId) {
            setMessages(undefined);
            return;
        }
        messagesService.getMessages(roomId).then((m) => setMessages(m));
    }, [roomId]);

    const onMessageSubmit = (event: FormEvent) => {
        event.preventDefault();
        const msg = inputRef.current?.value;
        if(!roomId || !msg?.trim() || !inputRef.current) return;

        messagesService.sendMessage(roomId, msg);
        inputRef.current.value = '';
    };

    if(!roomId) {
        return <h1 className='chat__no-messages'>Hey champion! Select a room to view the chat!</h1>;
    }

    return (
        <>
            <div className='chat__messages'>
                {messageComponents}
            </div>
            <div className='chat__input'>
                <form onSubmit={onMessageSubmit}>
                    <input ref={inputRef} type='text' />
                    <button className='chat__input-send'></button>
                </form>
            </div>
        </>
    );
}
