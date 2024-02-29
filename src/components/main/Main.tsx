import MenuPanel from '../menu-panel/MenuPanel';
import RoomsPanel from '../rooms-panel/RoomsPanel';
import ChatPanel from '../chat-panel/ChatPanel';
import UserPanel from '../user-panel/UserPanel';
import ApplicationContext from '../../contexts/app-context';
import { useEffect, useState } from 'react';
import { IRoom } from '../../models/room.model';
import ResizableGrid from '../../modules/resizable-grid/resizable-grid/ResizableGrid';
import ResizableGridColumn from '../../modules/resizable-grid/resizable-grid-column/ResizableGridColumn';

import './Main.scss';
import roomService from '../../services/room.service';
import useSyncWithService from '../../hooks/use-sync-with-service.hook';
import { IUser } from '../../models/user.model';
import userService from '../../services/user.service';
import messagesSocketService from '../../services/messages-socket.service';

const RESIZABLE_COLUMN = {
    min: 200,
    max: 600
};

const resizeColumnMinMax = (width: number) => {
    return Math.max(RESIZABLE_COLUMN.min, Math.min(RESIZABLE_COLUMN.max, width)) / 10;
};

export default function Main() {
    const [selectedRoom, setSelectedRoom] = useState<IRoom>();
    const [selectedUser, setSelectedUser] = useState<IUser>(userService.currentUser!);
    const [resizableColumnsWidths, setResizableColumnWidths] = useState<[number, number]>([30, 30]);

    useEffect(() => {
        messagesSocketService.connect();
    }, []);

    useSyncWithService(roomService, 'selectedRoom', selectedRoom?.id);

    const onResize = (index: number, initialWidth: number, delta: number) => {
        resizableColumnsWidths[index] = resizeColumnMinMax(initialWidth + delta);
        setResizableColumnWidths([...resizableColumnsWidths]);
    };

    return (
        <main className="main">
            <ApplicationContext.Provider value={{ selectedRoom, setSelectedRoom, selectedUser, setSelectedUser }}>
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
            </ApplicationContext.Provider>
        </main>
    );
}
