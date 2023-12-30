import MenuPanel from '../menu-panel/MenuPanel';
import RoomsPanel from '../rooms-panel/RoomsPanel';
import ChatPanel from '../chat-panel/ChatPanel';
import UserPanel from '../user-panel/UserPanel';
import Context__SelectedRoom from '../../contexts/SelectedRoomContext';

import './Main.scss';

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
