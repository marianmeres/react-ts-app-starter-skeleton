
export const mmSequence = (() => {
    let _counters = {};
    return (prefix?: string) => {
        let _prefix = `_${prefix}`;

        const seq = {
            reset: () => {
                delete _counters[_prefix];
                return seq;
            },
            current: (): number | string => {
                _counters[_prefix] = _counters[_prefix] || 0;
                return prefix ? `${prefix}${_counters[_prefix]}` : _counters[_prefix];
            },
            next: (): number | string => {
                _counters[_prefix] = _counters[_prefix] || 0;
                let i = ++_counters[_prefix];
                return prefix ? `${prefix}${i}` : i;
            },
        };

        return seq;
    };
})();

/**
 * @param ms
 */
export const mmDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));