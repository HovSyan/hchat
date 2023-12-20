export type IRoom = {
    id: number;
    name: string;
    img: string;
    last_msg: string;
};

export type ICreationRoom = Omit<IRoom, 'id'>;
