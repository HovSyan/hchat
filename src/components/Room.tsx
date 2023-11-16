import { MouseEventHandler, useState } from 'react';
import { IRoom } from '../models/room.model';

export type RoomProps = {
    room: IRoom;
    selected: boolean;

    onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Room({ room, selected, onClick }: RoomProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    console.log('Room rendered');
    return (
        <div
            className={`room ${selected ? 'room--selected' : ''}`}
            onClick={onClick}
        >
            <div className="room__img">
                <img
                    src={room.img}
                    alt={room.name}
                    style={{ display: imageLoaded ? 'initial' : 'none' }}
                    onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                    <span className="room__img-alt">{room.name[0]}</span>
                )}
            </div>
            <div className="room__name">{room.name}</div>
            <div className="room__last-msg" title={room.last_msg}>
                {room.last_msg}
            </div>
        </div>
    );
}
