import axios from 'axios';
import { API_CONFIG } from '../configs/api.config';
import { IMessage } from '../models/message.model';
import messagesSocketService from './messages-socket.service';
import roomService from './room.service';
import userService from './user.service';
import uuidService from './uuid.service';

export class MessagesService {
    private _getMessagesUrl = (roomId: number) => `${API_CONFIG.url}/room/${roomId}/messages`; 
    
    getMessages = (roomId: number, offset = 0, limit = 50): Promise<IMessage[]> => {
        return axios.get(this._getMessagesUrl(roomId), { params: { offset, limit }}).then((x) => x.data);
    };

    sendMessage = (msg: string) => {
        const message = this._newMessage(msg);
        messagesSocketService.sendMessage(message);
    };

    private _newMessage(text: string): IMessage {
        this._assertDefined(roomService.selectedRoom);
        this._assertDefined(userService.currentUser);

        return {
            id: uuidService.id(),
            created_at: new Date(),
            updated_at: new Date(),
            created_by: userService.currentUser.id,
            room_id: roomService.selectedRoom,
            text,
        };
    }

    private _assertDefined<T>(x: T | undefined): asserts x is T {
        if (x === undefined) {
            throw new Error('Assertion failed, provided undefined!');
        }
    }
}

const messagesService = new MessagesService();
export default messagesService;
