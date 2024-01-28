import { v4 } from 'uuid';

export class UUIDService {
    id(): string {
        return v4();
    }
}

export default new UUIDService();