import MenuPanel from '../menu-panel/MenuPanel';
import RoomsPanel from '../rooms-panel/RoomsPanel';
import ChatPanel from '../chat-panel/ChatPanel';
import UserPanel from '../user-panel/UserPanel';
import RoomContext, { ISelectedRoomContext } from '../../contexts/SelectedRoomContext';
import { useState } from 'react';
import { IRoom } from '../../models/room.model';

import './Main.scss';

export default function Main() {
    const [selectedRoom, setSelectedRoom] = useState<IRoom['id']>();
    const selectedRoomContext: ISelectedRoomContext = {
        room: selectedRoom,
        setRoom: setSelectedRoom,
    };

    return (
        <main className="main">
            <RoomContext.Provider value={selectedRoomContext}>
                <MenuPanel />
                <RoomsPanel />
                <ChatPanel />
                <UserPanel />
            </RoomContext.Provider>
        </main>
    );
}
