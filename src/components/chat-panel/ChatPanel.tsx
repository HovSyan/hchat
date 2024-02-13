import { useContext } from 'react';
import Chat from '../chat/Chat';
import SelectedRoomContext from '../../contexts/app-context';

import './ChatPanel.scss';

export default function ChatPanel() {
    const { selectedRoom } = useContext(SelectedRoomContext);
    return (
        <section className="chat-panel">
            <Chat roomId={selectedRoom?.id} />
        </section>
    );
}