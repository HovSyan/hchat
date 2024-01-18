import { useContext } from 'react';
import { useFetch } from '../../hooks/use-fetch.hook';
import { IRoom } from '../../models/room.model';
import roomService from '../../services/room.service';
import Room from '../room/Room';
import SelectedRoomContext from '../../contexts/SelectedRoomContext';
import Error from '../error/Error';

import './RoomsPanel.scss';

export default function RoomsPanel() {
    const { room: seletedRoom, setRoom: setSelectedRoom } = useContext(SelectedRoomContext);
    const [rooms, pending, error] = useFetch<IRoom[]>(roomService.getRooms);

    if(seletedRoom == undefined && rooms?.length) {
        setSelectedRoom(rooms[0].id);   
        return <></>;
    }

    let panelData: JSX.Element;
    if (error) {
        panelData = <Error />;
    } else if (pending) {
        panelData = <h1>Pending</h1>;
    } else {
        panelData = <>
            {rooms.map((room) => (
                <Room
                    room={room}
                    selected={seletedRoom === room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    key={room.id}
                />))}
            <button className="rooms-panel__add-new">
                <span>+</span> New Room
            </button>
        </>;
    }

    return <aside className="rooms-panel">{panelData}</aside>;
}