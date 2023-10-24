import { IRoom } from "../models/room.model"

export type RoomProps = {
    room: IRoom
}

export default function Room({ room }: RoomProps) {
    console.log('Room rendered')
    return (
        <div>
            <span>{room.id}</span><span>{room.name}</span>
        </div>
    )
}