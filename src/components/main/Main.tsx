import MenuPanel from '../menu-panel/MenuPanel';
import RoomsPanel from '../rooms-panel/RoomsPanel';
import ChatPanel from '../chat-panel/ChatPanel';
import UserPanel from '../user-panel/UserPanel';
import RoomContext, { ISelectedRoomContext } from '../../contexts/SelectedRoomContext';
import { useState } from 'react';
import { IRoom } from '../../models/room.model';
import ResizableGrid from '../../modules/resizable-grid/resizable-grid/ResizableGrid';
import ResizableGridColumn from '../../modules/resizable-grid/resizable-grid-column/ResizableGridColumn';

import './Main.scss';

const RESIZABLE_COLUMN = {
    min: 200,
    max: 600
};

const resizeColumnMinMax = (width: number) => {
    return Math.max(RESIZABLE_COLUMN.min, Math.min(RESIZABLE_COLUMN.max, width)) / 10;
};

export default function Main() {
    const [selectedRoom, setSelectedRoom] = useState<IRoom['id']>();
    const [resizableColumnsWidths, setResizableColumnWidths] = useState<[number, number]>([30, 30]);

    const selectedRoomContext: ISelectedRoomContext = {
        room: selectedRoom,
        setRoom: setSelectedRoom,
    };

    const onResize = (index: number, initialWidth: number, delta: number) => {
        console.log(index, initialWidth, delta);
        resizableColumnsWidths[index] = resizeColumnMinMax(initialWidth + delta);
        setResizableColumnWidths([...resizableColumnsWidths]);
    };

    return (
        <main className="main">
            <RoomContext.Provider value={selectedRoomContext}>
                <ResizableGrid onResize={onResize}>
                    <ResizableGridColumn width='5.5rem'>
                        <MenuPanel />
                    </ResizableGridColumn>
                    <ResizableGridColumn separator='after' width={resizableColumnsWidths[0] + 'rem'}>
                        <RoomsPanel />
                    </ResizableGridColumn>
                    <ResizableGridColumn>
                        <ChatPanel />
                    </ResizableGridColumn>
                    <ResizableGridColumn separator='before' width={resizableColumnsWidths[1] + 'rem'}>
                        <UserPanel />
                    </ResizableGridColumn>
                </ResizableGrid>
            </RoomContext.Provider>
        </main>
    );
}
