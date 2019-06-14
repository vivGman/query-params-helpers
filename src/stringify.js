export function stringify(object, url = '') {
    let [path = '', params = ''] = url.split('?');
    let queryString = params ? params.split('&') : [];

    object = {
        ...makePlainObject(object)
    }

    for (let key in object) {
        let item = object[key];
        let param = Array.isArray(item)
            ? item
                  .map((value) => `${key}=${encodeURIComponent(value)}`)
                  .join('&')
            : `${key}=${encodeURIComponent(item)}`;
        queryString.push(param);
    }
    return queryString.length ? path + '?' + queryString.join('&') : path;
}

function makePlainObject(obj, prefix='') {
    const isArray = obj instanceof Array
    let result = isArray ? [] : {}

    for (let key in obj) {
        const nextKey = prefix + (prefix ? '[' + key + ']' : key)
        const isAllowedObject = obj[key] instanceof Array || String(obj[key]) === '[object Object]'
        if (isAllowedObject) {
            result = {
                ...result,
                ...makePlainObject(obj[key], nextKey)
            }
        } else { 
            result[nextKey] = obj[key];
        }
    }
    return result
}