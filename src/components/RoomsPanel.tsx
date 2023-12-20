import { useFetch } from '../hooks/use-fetch.hook';
import { IRoom } from '../models/room.model';
import roomService from '../services/room.service';
import Room from './Room';

const getRoomsFn = roomService.getRooms.bind(roomService);

export type RoomsPanelProps = {
    selected?: IRoom['id']

    onRoomSelect: (roomId: IRoom['id']) => void;
}

export default function RoomsPanel({ selected, onRoomSelect }: RoomsPanelProps) {
    const [rooms, pending] = useFetch<IRoom[]>(getRoomsFn);

    return (
        <aside className="rooms-panel">
            {pending
                ? 'Loading...'
                : rooms.map((room) => (
                    <Room
                        room={room}
                        selected={selected === room.id}
                        onClick={() => onRoomSelect(room.id)}
                        key={room.id}
                    />
                ))}
            <button className="rooms-panel__add-new">
                <span>+</span> Add New Room
            </button>
        </aside>
    );
}