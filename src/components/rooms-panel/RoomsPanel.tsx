import { IRoom } from '../../models/room.model';
import roomService from '../../services/room.service';
import Room from '../room/Room';
import Error from '../error/Error';

import './RoomsPanel.scss';
import useSelectedRoom from '../../hooks/use-selected-room.hook';
import Fetch from '../fetch/Fetch';
import { useState } from 'react';

export default function RoomsPanel() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useSelectedRoom(rooms);

    return <aside className="rooms-panel">
        <Fetch 
            fetchFn={roomService.getRooms}
            onError={<Error />}
            onLoading={<h1>Pending</h1>} 
            onSuccess={setRooms}
        >
            {rooms.map((room) => (
                <Room
                    room={room}
                    selected={selectedRoom === room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    key={room.id}
                />))}
            <button className="rooms-panel__add-new">
                <span>+</span> New Room
            </button>
        </Fetch>
    </aside>;
}