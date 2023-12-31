import { Dispatch, SetStateAction, createContext } from 'react';
import { IRoom } from '../models/room.model';

export type ISelectedRoomContext = {
    room: IRoom['id'] | undefined,
    setRoom: Dispatch<SetStateAction<IRoom['id'] | undefined>>
}

export default createContext<ISelectedRoomContext>({} as ISelectedRoomContext);
