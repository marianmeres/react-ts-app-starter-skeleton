
export interface BaseModelData {
    [index: string]: any;
}

/**
 * hoho
 */
export default class BaseModel {

    /**
     * @type {{}}
     * @private
     */
    protected _data: BaseModelData;

    /**
     * @type {Array}
     * @private
     */
    protected _dirtyKeys = [];

    /**
     * @param data
     * @param {boolean} forceDirty
     */
    constructor(data?: any, forceDirty: boolean = false) {
        if (data && data.toJSON) { // naive...
            data = data.toJSON();
        }

        this._data = Object.assign({}, this._defaults); // dolezity uvodny init...

        this.populate(Object.assign({}, this._defaults, data || {})); // populate via setters
        this.resetDirty();

        if (forceDirty) { this.markDirty(); }
    }

    /**
     * @param data
     * @returns {BaseModel}
     */
    populate(data) {
        if (data) {
            // allow whitelisted only
            Object.keys(this._defaults).forEach((k) => {
                if (data[k] !== void 0) {
                    this.set(k, data[k]);
                }
            });
        }
        return this;
    }

    /**
     * @returns {BaseModelData}
     * @private
     */
    get _defaults(): BaseModelData {
        throw new Error('Method _defaults must be overidden in extended models');
    }

    /**
     * @returns {BaseModelData}
     */
    toJSON(): BaseModelData {
        return Object.keys(this._data).reduce((out, k) => {
            out[k] = this.get(k); return out;
        }, {});
    }


    /**
     * @param k
     * @returns {PropertyDescriptor | boolean}
     * @private
     */
    protected _hasSetterFor(k) {
        let proto = Object.getPrototypeOf(this);
        let desc = Object.getOwnPropertyDescriptor(proto, k);
        return (desc && !!desc.set);
    }

    /**
     * @param k
     * @returns {PropertyDescriptor | boolean}
     * @private
     */
    protected _hasGetterFor(k) {
        let proto = Object.getPrototypeOf(this);
        let desc = Object.getOwnPropertyDescriptor(proto, k);
        return (desc && !!desc.get);
    }

    /**
     * @param k
     * @param v
     * @returns {BaseModel}
     */
    set(k, v) {
        let oldRawValue = this._data[k];

        // CONVENTION: prefer setter if exists
        this._hasSetterFor(k) ? (this[k] = v) : (this._data[k] = v);

        let newRawValue = this._data[k];
        if (oldRawValue !== newRawValue && -1 === this._dirtyKeys.indexOf(k)) {
            this._dirtyKeys.push(k);
        }

        return this;
    }

    /**
     * @param k
     * @returns {any}
     */
    get(k): any {
        // CONVENTION: prefer getter if exists (pozor na koliziu nazvov)
        return this._hasGetterFor(k) ? this[k] : this._data[k];
    }

    /**
     * @returns {BaseModel}
     */
    resetDirty() {
        this._dirtyKeys = [];
        return this;
    }

    markDirty() {
        this.resetDirty();
        Object.keys(this._data).forEach((k) => this._dirtyKeys.push(k));
        return this;
    }

    /**
     * @returns {number}
     */
    isDirty() { return this._dirtyKeys.length; }

    /**
     * @returns {Array}
     */
    get dirtyKeys() { return this._dirtyKeys; }

    /**
     * @param k
     * @returns {boolean}
     */
    keyExists(k) { return this._data[k] !== void 0; }

    /**
     * @returns {BaseModelData}
     */
    static defaults(): BaseModelData {
        throw new Error('Method defaults must be overidden in extended models');
    }

}