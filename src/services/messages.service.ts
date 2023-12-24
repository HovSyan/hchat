import { IMessage } from '../models/message.model';

export class MessagesService {
    getMessages = (roomId: number): Promise<IMessage[]> => {
        return Promise.resolve([]);
    };

    sendMessage = (roomId: number, msg: string): Promise<void> => {
        console.log(msg);
        return Promise.resolve();
    };
}

const messagesService = new MessagesService();
export default messagesService;
