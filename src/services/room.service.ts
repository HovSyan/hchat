import { IRoom } from "../models/room.model";
import { API_CONFIG } from "../configs/api.config";

class RoomService {
    get rooms(): IRoom[] {
        return this._rooms;
    }

    private _rooms: IRoom[] = [];
    private _getAllUrl = API_CONFIG.url + '/rooms';

    getRooms(): Promise<IRoom[]> {
        console.log(this._getAllUrl)
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    { id: 1, name: 'One '},
                    { id: 2, name: 'Two '},
                    { id: 3, name: 'Three '},
                ]);
            }, 2000)
        })
        // return Promise.resolve([
        //     { id: 1, name: 'One '},
        //     { id: 2, name: 'Two '},
        //     { id: 3, name: 'Three '},
        // ])
        // return axios.get<IRoom[]>(this._getAllUrl).then((response) => this._rooms = response.data);
    }
}

const roomService = new RoomService();
export default roomService;

