import { Dispatch, SetStateAction, createContext } from 'react';
import { IRoom } from '../models/room.model';
import { IUser } from '../models/user.model';

export type ISelectedRoomContext = {
    selectedRoom: IRoom | undefined,
    setSelectedRoom: Dispatch<SetStateAction<IRoom | undefined>>
}

export type ISelectedUserContext = {
    selectedUser: IUser,
    setSelectedUser: Dispatch<SetStateAction<IUser>>
}

export type IApplicationContext = ISelectedRoomContext & ISelectedUserContext;

export default createContext<IApplicationContext>(Object.create(null));
