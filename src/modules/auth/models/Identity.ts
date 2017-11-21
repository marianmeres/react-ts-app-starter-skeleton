import BaseModel from '../../../_library-shared/src/model/BaseModel';

export interface IdentityData {
    user_id?: string | number | null; // a.k.a. hotel room number
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    api_token?: string | null;
}

export default class Identity extends BaseModel {

    static readonly KEY_USER_ID = 'user_id';
    static readonly KEY_EMAIL = 'email';
    static readonly KEY_FIRST_NAME = 'first_name';
    static readonly KEY_LAST_NAME = 'last_name';
    static readonly KEY_API_TOKEN = 'api_token';

    protected _data = Identity.defaults();

    get user_id()    { return this._data[Identity.KEY_USER_ID]; }
    get email()      { return this._data[Identity.KEY_EMAIL]; }
    get first_name() { return this._data[Identity.KEY_FIRST_NAME]; }
    get last_name()  { return this._data[Identity.KEY_LAST_NAME]; }
    get api_token()  { return this._data[Identity.KEY_API_TOKEN]; }

    get _defaults(): IdentityData {
        return Identity.defaults();
    }

    static defaults(): IdentityData {
        return {
            [Identity.KEY_USER_ID]: null,
            [Identity.KEY_EMAIL]: null,
            [Identity.KEY_FIRST_NAME]: null,
            [Identity.KEY_LAST_NAME]: null,
            [Identity.KEY_API_TOKEN]: null,
        };
    }

}