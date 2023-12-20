import { IRoom } from '../models/room.model';
import Chat from './Chat';

export type ChatPanelProps = {
    roomId: IRoom['id'] | undefined
}

export default function ChatPanel({ roomId }: ChatPanelProps) {
    return (
        <section className="chat-panel">
            <Chat roomId={roomId} />
        </section>
    );
}