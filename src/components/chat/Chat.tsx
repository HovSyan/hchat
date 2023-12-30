import { FormEvent, useEffect, useRef, useState } from 'react';
import { IRoom } from '../../models/room.model';
import { IMessage } from '../../models/message.model';
import messagesService from '../../services/messages.service';
import Message from '../message/Message';

import './Chat.scss';
import Icon from '../icon/Icon';

export type ChatProps = {
    roomId: IRoom['id'] | undefined;
};

export default function Chat({ roomId }: ChatProps) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageComponents = messages.length
        ? messages?.map((m) => <Message msg={m} key={m.id} /> ) 
        : <h1 className='chat__no-messages'>No Messages Yet!</h1>;

    useEffect(() => {
        if (!roomId) {
            setMessages([]);
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
                    <input spellCheck="false" ref={inputRef} type='text' />
                    <span className='chat__input-animation'></span>
                    <button className='chat__input-send'>
                        <Icon name='send'/>
                    </button>
                </form>
            </div>
        </>
    );
}
