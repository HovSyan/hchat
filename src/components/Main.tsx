import MenuPanel from './MenuPanel';
import RoomsPanel from './RoomsPanel';
import ChatPanel from './ChatPanel';
import UserPanel from './UserPanel';
import Context__SelectedRoom from '../contexts/SelectedRoomContext';

export default function Main() {
    return (
        <main className="main">
            <MenuPanel />
            <Context__SelectedRoom>
                <RoomsPanel />
                <ChatPanel />
            </Context__SelectedRoom>
            <UserPanel />
        </main>
    );
}
