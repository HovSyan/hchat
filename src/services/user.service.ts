import { IUser } from "../models/user.model";

const MOCK_USERS: IUser[] = [
    { id: 1, nickname: 'Dexter' },
    { id: 2, nickname: 'Brao' },
    { id: 3, nickname: 'Gas' },
    { id: 4, nickname: 'Reznov' },
]

class UserService {
    getUser(id: IUser['id']): Promise<IUser | undefined> {
        return Promise.resolve(MOCK_USERS.find((u) => u.id === id));
    }
}

const userService = new UserService();
export default userService;