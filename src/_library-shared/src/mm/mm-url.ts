/**
 * This function parses ampersand-separated name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in
 * properties of an object and returns that object. Use it like this:
 *
 * var args = urlArgs(); // Parse args from URL
 * var q = args.q || ""; // Use argument, if defined, or a default value * var n = args.n ? parseInt(args.n) : 10;
 *
 * @param query
 * @param separator
 * @returns {{}}
 */
export function mm_parseQuery(query?: string, separator: string = '&'): any {
    query = query || window.location.search.substring(1);

    let out = {};
    let pairs = query.split(separator);

    for (let i = 0; i < pairs.length; i++) {
        let pos = pairs[i].indexOf('=');
        if (pos === -1) { continue; }

        let name = pairs[i].substring(0, pos);
        out[name] = decodeURIComponent(pairs[i].substring(pos + 1));
    }

    return out;
}


/**
 * https://gist.github.com/jlong/2428561
 * @param url
 * @param key
 * @returns {{protocol: string, hostname: string, port: string, pathname: string, search: string, hash: string}}
 */
export function mm_parseUrl(url?: string, key?) {
    let out = {
        protocol: '', // => "http:"
        hostname: '', // => "example.com"
        port: '',     // => "3000"
        pathname: '', // => "/pathname/"
        search: '',   // => "?search=test"
        hash: '',     // => "#hash"
    };
    let parser = document.createElement('a');
    parser.href = url || window.location.href;

    Object.keys(out).forEach((k) => out[k] = parser[k] || '');

    return key ? out[key] : out;
}

/**
 * https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 *
 * @param b64Data
 * @param {string} contentType
 * @param {number} sliceSize
 * @returns {Blob}
 */
export function mm_b64toBlob(b64Data, contentType = '', sliceSize = 512) {

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}