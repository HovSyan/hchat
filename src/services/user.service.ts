import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../configs/localStorage.config';
import { IUser } from '../models/user.model';
import { API_CONFIG } from '../configs/api.config';

class UserService {
    private _currentUser: IUser | undefined;

    private _validateNicknameUrl = API_CONFIG.url + '/user/nicknameExists';
    private _userUrl = API_CONFIG.url + '/user';
    
    set currentUser(u: IUser | undefined) {
        this._currentUser = u;
        u && localStorage.setItem(LOCAL_STORAGE_KEYS.user, u.id.toString());
    }

    get currentUser(): IUser | undefined {
        return this._currentUser;   
    }

    getUser(id: IUser['id']): Promise<IUser | undefined> {  
        return axios.get(this._userUrl, { params: { id }}).then((res) => res.data);
    }

    nicknameExists(nickname: string): Promise<boolean> {
        return axios.get(this._validateNicknameUrl, { params: { nickname }}).then((res) => !!res.data);
    }

    newUser(nickname: string, avatar: File | null): Promise<IUser> {
        const formData = new FormData();
        formData.append('nickname', nickname);
        avatar && formData.append('avatar', avatar);
        return axios.post(this._userUrl, formData).then((res) => res.data);
    }
}

export default new UserService();
