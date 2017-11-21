
const _isAllowed = true;

export class Log {

    static debug(...args) {
        _isAllowed && console.log.apply(null, args);
    }

    static log(...args) {
        _isAllowed && console.log.apply(null, args);
    }

    static error(...args) {
        _isAllowed && console.error.apply(null, args);
    }

    static warn(...args) {
        _isAllowed && console.warn.apply(null, args);
    }
}