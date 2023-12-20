import { IRoom } from '../models/room.model';

import { useState } from 'react';
import MenuPanel from './MenuPanel';
import RoomsPanel from './RoomsPanel';
import ChatPanel from './ChatPanel';
import UserPanel from './UserPanel';

export default function Main() {
    const [selectedRoom, setSelectedRoom] = useState<IRoom['id'] | undefined>();

    console.log('Main rendered', selectedRoom);
    return (
        <main className="main">
            <MenuPanel />
            <RoomsPanel selected={selectedRoom} onRoomSelect={(roomId) => setSelectedRoom(roomId)}/>
            <ChatPanel roomId={selectedRoom}/>
            <UserPanel />
        </main>
    );
}
