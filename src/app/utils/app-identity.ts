
import { IdentityData } from '../../modules/auth/models/Identity';
import { isStorageAvailable } from '../../_library-shared/src/mm/mm-storage';
import { appLocalStorage } from './app-storage';

declare const window: any;

export const saveAppIdentityToLocalStorage = (idenity: IdentityData | null): boolean => {
    if (!isStorageAvailable('localStorage')) { return false; }
    appLocalStorage().setItem('identity', idenity);
    return true;
};

export const getAppIdentityFromLocalStorage = (): IdentityData | null | boolean => {
    if (!isStorageAvailable('localStorage')) { return false; }
    return appLocalStorage().getItem('identity');
};

