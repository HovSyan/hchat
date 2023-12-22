import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { IRoom } from '../models/room.model';

export type ISelectedRoomContext = {
    room: IRoom['id'] | undefined,
    setRoom: Dispatch<SetStateAction<IRoom['id'] | undefined>>
}

export const SelectedRoomContext = createContext<ISelectedRoomContext>({} as ISelectedRoomContext);

export default function Context__SelectedRoom({ children }: { children: ReactNode }) {
    const [room, setRoom] = useState<IRoom['id'] | undefined>();
    return <SelectedRoomContext.Provider value={ {room, setRoom} }>
        {children}
    </SelectedRoomContext.Provider>;
}
