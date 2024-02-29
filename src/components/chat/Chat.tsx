import { IRoom } from '../../models/room.model';
import messagesService from '../../services/messages.service';
import Message from '../message/Message';
import ChatInput from '../chat-input/ChatInput';

import './Chat.scss';
import useMessages from '../../hooks/use-messages.hook';
import messagesSocketService from '../../services/messages-socket.service';

export type ChatProps = {
    roomId: IRoom['id'] | undefined;
};

// messagesSocketService.connect();

export default function Chat({ roomId }: ChatProps) {
    const messages = useMessages(roomId);
    const messageComponents = messages.length
        ? messages?.map((m) => <Message msg={m} key={m.id} /> ) 
        : <h1 className='chat__no-messages'>No Messages Yet!</h1>;

    const onMessageSubmit = (msg: string) => {
        if(!roomId) return;

        messagesService.sendMessage(msg);
    };

    return !roomId 
        ? <h1 className='chat__no-messages'>Hey champion! Select a room to view the chat!</h1> 
        : (
            <>
                <div className='chat__messages'>{messageComponents}</div>
                <ChatInput onMessageSubmit={onMessageSubmit}/>
            </>
        );
}
