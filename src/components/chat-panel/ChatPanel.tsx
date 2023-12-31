import { useContext } from 'react';
import Chat from '../chat/Chat';
import SelectedRoomContext from '../../contexts/SelectedRoomContext';

import './ChatPanel.scss';

export default function ChatPanel() {
    const { room } = useContext(SelectedRoomContext);
    return (
        <section className="chat-panel">
            <Chat roomId={room} />
        </section>
    );
}