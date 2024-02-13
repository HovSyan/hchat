import { useContext, useEffect } from 'react';
import { IRoom } from '../models/room.model';
import SelectedRoomContext from '../contexts/app-context';

export default function useSelectedRoom(rooms: IRoom[] | null) {
    const { selectedRoom, setSelectedRoom } = useContext(SelectedRoomContext);

    useEffect(() => {
        if(selectedRoom == undefined && rooms?.length) {
            setSelectedRoom(rooms[0]);       
        }
    }, [selectedRoom, rooms]);

    return [selectedRoom, setSelectedRoom] as const;
}