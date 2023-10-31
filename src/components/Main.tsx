import roomService from "../services/room.service"
import Room from "./Room";
import { IRoom } from "../models/room.model";
import { useFetch } from "../hooks/use-fetch.hook";
import { useState } from "react";

const getRooms = () => roomService.getRooms()

export default function Main() {
    const [rooms, pending] = useFetch<IRoom[]>(getRooms);
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
            <section className="chat">Chat</section>
            <aside className="user-info">User info</aside>
        </main>
    )
}