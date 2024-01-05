import { useContext } from 'react';
import { IRoom } from '../models/room.model';
import SelectedRoomContext from '../contexts/SelectedRoomContext';

export default function useSelectedRoom(rooms: IRoom[]) {
    const { room, setRoom } = useContext(SelectedRoomContext);

    if(room === undefined && rooms.length) {
        setRoom(rooms[0].id);
    }

    return [room, setRoom];
}