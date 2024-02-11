import { useContext, useEffect } from 'react';
import { IRoom } from '../models/room.model';
import SelectedRoomContext from '../contexts/SelectedRoomContext';

export default function useSelectedRoom(rooms: IRoom[] | null) {
    const { room, setRoom } = useContext(SelectedRoomContext);

    useEffect(() => {
        if(room == undefined && rooms?.length) {
            setRoom(rooms[0].id);       
        }
    }, [room, rooms]);

    return [room, setRoom] as const;
}