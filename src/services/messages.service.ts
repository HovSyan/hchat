import { IMessage } from "../models/message.model";

const MOCK_MESSAGES: Record<number, IMessage[]> = {
    1: [
        { 
            id: '1_1',
            room_id: 1,
            text: 'This 1',
            created_by: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '1_2',
            room_id: 1,
            text: 'is 1',
            created_by: 2,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '1_3',
            room_id: 1,
            text: 'A 1',
            created_by: 3,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '1_4',
            room_id: 1,
            text: 'Message 1',
            created_by: 4,
            created_at: new Date(),
            updated_at: new Date()
        },
    ],
    2: [
        { 
            id: '2_1',
            room_id: 2,
            text: 'This 2 sdkfnsdf skjdfsldnf dskhfjThis 2 sdkfnsdf skjdfsldnf dskhfjThis 2 sdkfnsdf skjdfsldnf dskhfjThis 2 sdkfnsdf skjdfsldnf dskhfjThis 2 sdkfnsdf skjdfsldnf dskhfj',
            created_by: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '2_2',
            room_id: 2,
            text: 'is 2',
            created_by: 2,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '2_3',
            room_id: 2,
            text: 'A 2',
            created_by: 3,
            created_at: new Date(),
            updated_at: new Date()
        },{ 
            id: '2_4',
            room_id: 2,
            text: 'Message 2',
            created_by: 4,
            created_at: new Date(),
            updated_at: new Date()
        },
    ],
    3: [
        { 
            id: '3_1',
            room_id: 3,
            text: 'This 3',
            created_at: new Date(),
            created_by: 1,
            updated_at: new Date()
        },{ 
            id: '3_2',
            room_id: 3,
            text: 'is 3',
            created_at: new Date(),
            created_by: 2,
            updated_at: new Date()
        },{ 
            id: '3_3',
            room_id: 3,
            text: 'A 3',
            created_at: new Date(),
            created_by: 3,
            updated_at: new Date()
        },{ 
            id: '3_4',
            room_id: 3,
            text: 'Message 3',
            created_at: new Date(),
            created_by: 4,
            updated_at: new Date()
        },
    ],
    4: [
        { 
            id: '4_1',
            room_id: 4,
            text: 'This 4',
            created_at: new Date(),
            created_by: 1,
            updated_at: new Date()
        },{ 
            id: '4_2',
            room_id: 4,
            text: 'is 4',
            created_at: new Date(),
            created_by: 2,
            updated_at: new Date()
        },{ 
            id: '4_3',
            room_id: 4,
            text: 'A 4',
            created_at: new Date(),
            created_by: 3,
            updated_at: new Date()
        },{ 
            id: '4_4',
            room_id: 4,
            text: 'Message 4',
            created_at: new Date(),
            created_by: 4,
            updated_at: new Date()
        },
    ]
}

export class MessagesService {
    
    getMessages = (roomId: number): Promise<IMessage[]> => {
        return Promise.resolve(MOCK_MESSAGES[roomId]);
    }
}

const messagesService = new MessagesService();
export default messagesService;