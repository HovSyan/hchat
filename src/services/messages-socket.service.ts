import { io } from 'socket.io-client';
import { API_CONFIG } from '../configs/api.config';
import { Observable, Subject } from 'rxjs';
import { IMessage } from '../models/message.model';

class MessagesSocket {
    private _socket = io(API_CONFIG.socket, { autoConnect: false });
    private _onMessage = new Subject<IMessage>();

    get onMessage(): Observable<IMessage> {
        return this._onMessage;
    }

    connect() {
        this._socket.connect();
        this._socket.on('message', (message: IMessage) => {
            this._onMessage.next(message);
        });
    }

    sendMessage(message: IMessage) {
        this._socket.emit('message', message);
    }
}

export default new MessagesSocket();
