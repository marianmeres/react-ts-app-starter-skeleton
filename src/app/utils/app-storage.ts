
import { MMStorage } from '../../_library-shared/src/mm/mm-storage';
import { config } from '../config/config';

export const appLocalStorage = (): MMStorage => {
    return new MMStorage(`${config.appCode}|`, false);
};

export const appSessionStorage = (): MMStorage => {
    return new MMStorage(`${config.appCode}|`, true);
};