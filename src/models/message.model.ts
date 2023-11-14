import { IRoom } from "./room.model"
import { IUser } from "./user.model"

export type IMessage = {
    id: string,
    room_id: IRoom['id'],
    text: string,
    created_at: Date,
    created_by: IUser['id'],
    updated_at: Date
}