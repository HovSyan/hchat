import { IMessage } from '../models/message.model';
import roomService from './room.service';
import userService from './user.service';
import uuidService from './uuid.service';

export class MessagesService {
    getMessages = (roomId: number): Promise<IMessage[]> => {
        console.log(roomId);
        return Promise.resolve([]);
    };

    sendMessage = (roomId: number, msg: string): Promise<void> => {
        console.log(roomId, msg);
        return Promise.resolve();
    };

    newMessage(text: string): IMessage {
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
            throw new Error('Assertio failed, provided undefined!');
        }
    }
}

const messagesService = new MessagesService();
export default messagesService;
