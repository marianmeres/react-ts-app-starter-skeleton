
import { appStore } from '../../index';
import { identityActionCreators } from '../../modules/auth/redux/identity';

export interface ApiJsonResponse {
    isError: boolean;
    meta?: any;
    payload: any;
}

export default class ApiUtils {

    /**
     * check http request issues
     * @param response
     * @returns {any}
     */
    static checkResponseStatus(response) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
        if (response.ok) {
            return Promise.resolve(response);
        }

        // ak sme dostali zo servera unauthorized, tak najskor mame expirovany token
        // (legitimny stav), preto cleanupneme identitu na klientovi a teda efektivne
        // vynutime cisty login
        // NOTE: tym, ze volame dispatch z vonkajsej urovne, musime importovat store,
        // co mi dava taky trosku hackish feeling...
        if (response.status === 401) {
            appStore.dispatch(identityActionCreators.setIdentity(null));
        }

        //
        let error = new Error(response.statusText) as any;
        error.response = response; // save for later...
        throw error;
    }

    /**
     * check application envelope transport (custom convention) issues
     * @param {ApiJsonResponse} json
     * @returns {ApiJsonResponse}
     */
    static checkJsonApiEnvelope(json: ApiJsonResponse) {
        if (json.isError) {
            // konvencia je, ze ak je boolean flag `isError`, tak `payload` popisuje samotnu chybu
            throw new Error(json.payload);
        }
        return Promise.resolve(json);
    }

}