import axios from 'axios';
import { API_CONFIG } from '../configs/api.config';

class NetworkHealthcheckService {
    private _api = API_CONFIG.url + '/healthcheck';

    ping(): Promise<boolean> {
        return axios.get(this._api)
            .then(() => true)
            .catch(() => false);
    }
}

export default new NetworkHealthcheckService();