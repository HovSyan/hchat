import { IRoom } from "../models/room.model";
import { API_CONFIG } from "../configs/api.config";

class RoomService {
    get rooms(): IRoom[] {
        return this._rooms;
    }

    private _rooms: IRoom[] = [];
    private _getAllUrl = API_CONFIG.url + '/rooms';

    getRooms(): Promise<IRoom[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    { id: 1, name: 'One', img: 'https://picsum.photos/200/300?sig=1', last_msg: 'Hello World 1'},
                    { id: 2, name: 'Two', img: 'https://picsum.photos/200/300?sig=2', last_msg: 'Hello World 2'},
                    { id: 3, name: 'Three', img: 'https://picsum.photos/200/300?sig=3', last_msg: 'Hello World 3'},
                    { id: 4, name: 'Four', img: 'https://picsum.photos/200/300?sig=4', last_msg: 'Some really long text that will be overflowing 100%'},
                ]);
            }, 200)
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

