/**
 * Приводит объект к URL строке
 * 
 * @param {Object} object - Исходный объект
 * @param {Object} url - дефолтный url
 * @return {String}
 *
 * @example
 * import { stringify } from 'query-params-helpers';
 *
 * stringify({ 
 *   foo: 'bar' 
 * }); 
 * // '?foo=bar'
 * 
 * stringify({ 
 *   foo: [1, 2] 
 * }); 
 * // '?foo[]=1&foo[]=2'
 * 
 * stringify({ 
 *   foo: 1, 
 *   bar: { 
 *     x: 1, 
 *     y: 2
 *   } 
 * }); 
 * // '?foo=1&bar[x]=2&bar[y]=3'
 * 
 * stringify({ 
 *   foo: [{ 
 *     x: 10, 
 *     y: 20 
 *   }, { 
 *     x: 30, 
 *     y: 40 
 *   }] 
 * }); 
 * // '?foo[0][x]=10&foo[0][y]=20&foo[1][x]=30&foo[1][y]=40'
 */
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