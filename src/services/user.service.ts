import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../configs/localStorage.config';
import { IUser } from '../models/user.model';
import { API_CONFIG } from '../configs/api.config';
import blankProfileImage from '../assets/images/blank-profile-picture.webp';

class UserService {
    private _currentUser: IUser | undefined;
    private _cache = new Map<IUser['id'], IUser>();

    private _validateNicknameUrl = API_CONFIG.url + '/user/nicknameExists';
    private _userUrl = API_CONFIG.url + '/user';
    private _avatarUrl = API_CONFIG.url + '/user/avatar';
    
    set currentUser(u: IUser | undefined) {
        this._currentUser = u;
        u && localStorage.setItem(LOCAL_STORAGE_KEYS.user, u.id.toString());
    }

    get currentUser(): IUser | undefined {
        return this._currentUser;   
    }

    getUser = (id: IUser['id']): Promise<IUser | undefined> => {  
        if (this._cache.get(id)) {
            return Promise.resolve(this._cache.get(id));
        }
        return axios.get(this._userUrl, { params: { id }})
            .then((res) => {
                this._cache.set(id, res.data);
                return res.data;
            });
    };

    getAvatarUrl(avatar: IUser['avatar']): string {
        if (!avatar) return blankProfileImage;
        return `${this._avatarUrl}/${avatar}`;
    }

    nicknameExists = (nickname: string): Promise<boolean> => {
        return axios.get(this._validateNicknameUrl, { params: { nickname }}).then((res) => !!res.data);
    };

    newUser = (nickname: string, avatar: File | null): Promise<IUser> => {
        const formData = new FormData();
        formData.append('nickname', nickname);
        avatar && formData.append('avatar', avatar);
        return axios.post(this._userUrl, formData).then((res) => res.data);
    };
}

export default new UserService();
