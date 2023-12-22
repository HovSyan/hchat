import { useContext, useEffect } from 'react';
import { useFetch } from '../hooks/use-fetch.hook';
import { IRoom } from '../models/room.model';
import roomService from '../services/room.service';
import Room from './Room';
import { SelectedRoomContext } from '../contexts/SelectedRoomContext';

export default function RoomsPanel() {
    const { room: seletedRoom, setRoom: setSelectedRoom } = useContext(SelectedRoomContext);
    const [rooms, pending] = useFetch<IRoom[]>(roomService.getRooms);

    useEffect(() => {
        if(seletedRoom == undefined && rooms?.length) {
            setSelectedRoom(rooms[0].id);       
        }
    }, [seletedRoom, rooms]);

    return (
        <aside className="rooms-panel">
            {pending
                ? 'Loading...'
                : rooms.map((room) => (
                    <Room
                        room={room}
                        selected={seletedRoom === room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        key={room.id}
                    />
                ))}
            <button className="rooms-panel__add-new">
                <span>+</span> New Room
            </button>
        </aside>
    );
}