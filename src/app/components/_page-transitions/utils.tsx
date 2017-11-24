import * as _startsWith from 'lodash/startsWith';

/**
 * /a -> /a/b
 * /a -> /a/b/c/d
 *
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export const goesDeeper = (from: string, to: string): boolean => {
    if (from === to) { return false; }
    return _startsWith(`${to}/`, from);
};

/**
 * /a/b -> /a
 * /a/b/c/d -> /a/b
 *
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export const goesHigher = (from: string, to: string): boolean => {
    if (from === to) { return false; }
    return _startsWith(`${from}/`, to);
};

/**
 * /a/b -> /a/c
 *
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export const goesToSibling = (from: string, to: string): boolean => {
    if (from === to) { return false; }
    let fromParts = from.split('/');
    let toParts = to.split('/');
    if (fromParts.length !== toParts.length) { return false; }
    if (fromParts.length === 1 && toParts.length === 1) { return false; } // sanity check
    return fromParts.slice(0, -1).join('/') === toParts.slice(0, -1).join('/');
};

/**
 * /a/b -> /c/d
 * /a/b/c -> /a/d
 *
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export const goesElse = (from: string, to: string): boolean => {
    if (from === to) { return false; }
    return (
        !goesDeeper(from, to) && !goesHigher(from, to) && !goesToSibling(from, to)
    );
};

/**
 * /a -> /a
 *
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export const goesSame = (from: string, to: string): boolean => from === to;