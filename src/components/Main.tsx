import roomService from "../services/room.service"
import Room from "./Room";
import { IRoom } from "../models/room.model";
import { useFetch } from "../hooks/use-fetch.hook";

const getRooms = () => roomService.getRooms()

export default function Main() {
    const [rooms, pending] = useFetch<IRoom[]>(getRooms);
    
    console.log('Main rendered')
    return (
        <main className="main">
            <aside className="rooms">{
                pending ? 'Loading...' : rooms.map((room) => <Room room={room} key={room.id} />)
            }</aside>
            <section className="chats">Chat</section>
            <aside className="user-info">User info</aside>
        </main>
    )
}