import roomService from '../services/room.service';
import Room from './Room';
import { IRoom } from '../models/room.model';
import { useFetch } from '../hooks/use-fetch.hook';
import Chat from './Chat';

import { useCallback, useState } from 'react';

export default function Main() {
    const getRoomsFn = useCallback(() => roomService.getRooms(), []);
    const [rooms, pending] = useFetch<IRoom[]>(getRoomsFn);
    const [selectedRoom, setSelectedRoom] = useState<IRoom['id'] | undefined>();

    function getSelectedRoom(): typeof selectedRoom {
        return selectedRoom ?? rooms?.[0]?.id;
    }

    console.log('Main rendered', selectedRoom);
    return (
        <main className="main">
            <menu className="menu"></menu>
            <aside className="rooms">
                {pending
                    ? 'Loading...'
                    : rooms.map((room) => (
                        <Room
                            room={room}
                            selected={getSelectedRoom() === room.id}
                            onClick={() => setSelectedRoom(room.id)}
                            key={room.id}
                        />
                    ))}
                <button className="rooms__add-new">
                    <span>+</span> Add New Room
                </button>
            </aside>
            <section className="chat">
                <Chat roomId={getSelectedRoom()} />
            </section>
            <aside className="user-info">User info</aside>
        </main>
    );
}
