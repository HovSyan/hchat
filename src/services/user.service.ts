import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../configs/localStorage.config';
import { IUser } from '../models/user.model';
import { API_CONFIG } from '../configs/api.config';

const MOCK_USERS: IUser[] = [
    { id: 1, nickname: 'Dexter' },
    { id: 2, nickname: 'Brao' },
    { id: 3, nickname: 'Gas' },
    { id: 4, nickname: 'Reznov' },
];

class UserService {
    private _currentUser: IUser | undefined;

    private _validateNicknameUrl = API_CONFIG.url + '/user/nicknameExists';
    
    set currentUser(u: IUser | undefined) {
        this._currentUser = u;
        u && localStorage.setItem(LOCAL_STORAGE_KEYS.user, u.toString());
    }

    get currentUser(): IUser | undefined {
        return this._currentUser;   
    }

    getUser(id: IUser['id']): Promise<IUser | undefined> {  
        return Promise.resolve(MOCK_USERS.find((u) => u.id === id));
    }

    nicknameExists(nickname: string): Promise<boolean> {
        return axios.get(this._validateNicknameUrl, { params: { nickname }}).then((res) => !!res.data);
    }

    newUser(nickname: string, profile_img: File | null): Promise<IUser> {
        return Promise.resolve(MOCK_USERS[0]);
    }
}

export default new UserService();
