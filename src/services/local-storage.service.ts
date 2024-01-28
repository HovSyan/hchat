import { LOCAL_STORAGE_KEYS } from '../configs/localStorage.config';
import { IUser } from '../models/user.model';

export class LocalStorageService {
    getUserId(): IUser['id'] | null {
        const u = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
        return u ? +u : null;
    }
}

export default new LocalStorageService();