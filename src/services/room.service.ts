import { ICreationRoom, IRoom } from '../models/room.model';
import { API_CONFIG } from '../configs/api.config';
import axios from 'axios';

class RoomService {
    get rooms(): IRoom[] {
        return this._rooms;
    }

    private _rooms: IRoom[] = [];
    private _getAllUrl = API_CONFIG.url + '/rooms';
    private _createRoomUrl = API_CONFIG.url + '/room';

    getRooms = (): Promise<IRoom[]> => {
        return axios.get<IRoom[]>(this._getAllUrl).then((response) => this._rooms = response.data);
    };

    createRoom = (room: ICreationRoom): Promise<IRoom> => {
        return axios.post<IRoom>(this._createRoomUrl, room).then((response) => response.data);
    };
}

export default new RoomService();