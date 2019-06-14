
/**
 * Парсит параметры из строки поиска или URL 
 * 
 * @param {String} queryString - Строка запроса
 * @param {Object} options
 * @param {String} options.output - Формат вывода array, tree
 * @param {Boolean} options.typeConversion - Приведение типов
 * @return {Object|Array}
 *
 * @example
 *
 * parse('?foo=1&bar[x]=2&bar[y]=3') // { foo: 1, bar: { x: 1, y: 2 } }
 */
export function parse(queryString, options={ output: 'tree', typeConversion: true }) {
    switch (options.output) {
        case 'array': return stringToArray(queryString, options);
        case 'tree': return stringToTree(queryString, options);
        default: return stringToTree(queryString, options)
    }
}

export function stringToArray(queryString='', options={}) {

    const {
        typeConversion = true
    } = options;

    if (queryString.match(/\?/)) {
        queryString = queryString.replace(/#.*/, '')
        queryString = queryString.replace(/^.*\?/, '')
    } else if(queryString.match(/#/)) {
        queryString = queryString.replace(/^.*#/, '')
    }

    return queryString.split('&')
        .map(function(param) {
            let [ name, value ] = param.split('=')

            if (typeConversion && typeof value === 'string') {
                if (!isNaN(+value)) {
                    value = +value;
                } else if (value.match(/^(true|false)$/)) {
                    value = JSON.parse(value);
                }
            }

            return { name, value }
        })
}

export function stringToTree(queryString='', options={}) {
    const array = stringToArray(queryString, options)
    return arrayToTree(array);
}

export function arrayToTree(array) {
    const SEPARATOR = '[';
    const BEGIN = '$$BEGIN';
    const END = '$$END';

    function makePath(name) {
        name =
            name[0] === SEPARATOR ? BEGIN + name : BEGIN + SEPARATOR + name;

        return name
            .split(SEPARATOR)
            .concat(END)
            .map(function(item) {
                return item.replace(/\]$/, '');
            });
    }

    let json = {};

    array.forEach(function(item) {
        if (!item.name || item.name === 'hidden') {
            return;
        }
        let path = makePath(item.name);
        path.reduce(function(result, curr, index, array) {
            if (curr === END) return void 0;
            let next = array[index + 1];
            let value;

            if (isNaN(+next)) {
                value = result[curr] || {};
            } else {
                value = result[curr] || [];
            }

            if (next === END) {
                value = item.value;
            }

            if (result instanceof Array && curr === '') {
                const last = result[result.length - 1];

                if (!last || typeof last !== 'object' || last.hasOwnProperty(next)) {
                    result.push(value);
                    return result[result.length - 1];
                } else {
                    return last;
                }
            } else {
                result[curr] = value;
                return result[curr];
            }
        }, json);
    });

    return json[BEGIN];
}
