import roomService from "../services/room.service"
import Room from "./Room";
import { IRoom } from "../models/room.model";
import { useFetch } from "../hooks/use-fetch.hook";
import { useCallback, useState } from "react";
import Chat from "./Chat";

export default function Main() {
    const getRoomsFn = useCallback(() => roomService.getRooms(), [])
    const [rooms, pending] = useFetch<IRoom[]>(getRoomsFn);
    const [selectedRoom, setSelectedRoom] = useState<IRoom['id'] | undefined>();

    function getSelectedRoom(): typeof selectedRoom {
        return selectedRoom ?? rooms?.[0]?.id;
    }

    console.log('Main rendered', selectedRoom)
    return (
        <main className="main">
            <menu className="menu"></menu>
            <aside className="rooms">{
                pending ? 'Loading...' : rooms.map((room) => (
                    <Room room={room}
                          selected={getSelectedRoom() === room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          key={room.id} />
                ))
            }</aside>
            <section className="chat">
                <Chat roomId={getSelectedRoom()}/>
            </section>
            <aside className="user-info">User info</aside>
        </main>
    )
}