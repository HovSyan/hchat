import { useContext } from 'react';
import Chat from './Chat';
import { SelectedRoomContext } from '../contexts/SelectedRoomContext';

export default function ChatPanel() {
    const { room } = useContext(SelectedRoomContext);
    return (
        <section className="chat-panel">
            <Chat roomId={room} />
        </section>
    );
}