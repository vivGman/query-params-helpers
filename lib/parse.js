"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.stringToArray = stringToArray;
exports.stringToTree = stringToTree;
exports.arrayToTree = arrayToTree;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Парсит параметры из строки поиска или URL 
 * 
 * @param {String} queryString - Строка запроса
 * @param {Object} options
 * @param {String} options.output - Формат вывода array, tree
 * @param {Boolean} options.conversion - Приведение типов
 * @return {Object|Array}
 *
 * @example
 * import { parse } from 'query-params-helpers';
 *
 * parse('?foo=bar'); 
 * // { 
 * //    foo: 'bar' 
 * // }
 * 
 * parse('?foo[]=1&foo[]=2'); 
 * // { 
 * //    foo: [1, 2] 
 * // }
 * 
 * parse('?foo=1&bar[x]=2&bar[y]=3'); 
 * // { 
 * //    foo: 1, 
 * //    bar: { 
 * //      x: 2, 
 * //      y: 3 
 * //    } 
 * // }
 * 
 * parse('?foo[0][x]=10&foo[0][y]=20&foo[1][x]=30&foo[1][y]=40'); 
 * // { 
 * //   foo: [{ 
 * //     x: 10, 
 * //     y: 20 
 * //   }, { 
 * //     x: 30, 
 * //     y: 40 
 * //   }] 
 * // }
 */
function parse(queryString) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    output: 'tree',
    conversion: true
  };

  switch (options.output) {
    case 'array':
      return stringToArray(queryString, options);

    case 'tree':
      return stringToTree(queryString, options);

    default:
      return stringToTree(queryString, options);
  }
}

function stringToArray() {
  var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$conversion = options.conversion,
      conversion = _options$conversion === void 0 ? true : _options$conversion;

  if (queryString.match(/\?/)) {
    queryString = queryString.replace(/#.*/, '');
    queryString = queryString.replace(/^.*\?/, '');
  } else if (queryString.match(/#/)) {
    queryString = queryString.replace(/^.*#/, '');
  }

  return queryString.split('&').map(function (param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        name = _param$split2[0],
        value = _param$split2[1];

    if (conversion && typeof value === 'string') {
      if (!isNaN(+value)) {
        value = +value;
      } else if (value.match(/^(true|false)$/)) {
        value = JSON.parse(value);
      }
    }

    return {
      name: name,
      value: value
    };
  });
}

function stringToTree() {
  var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var array = stringToArray(queryString, options);
  return arrayToTree(array);
}

function arrayToTree(array) {
  var SEPARATOR = '[';
  var BEGIN = '$$BEGIN';
  var END = '$$END';

  function makePath(name) {
    name = name[0] === SEPARATOR ? BEGIN + name : BEGIN + SEPARATOR + name;
    return name.split(SEPARATOR).concat(END).map(function (item) {
      return item.replace(/\]$/, '');
    });
  }

  var json = {};
  array.forEach(function (item) {
    if (!item.name || item.name === 'hidden') {
      return;
    }

    var path = makePath(item.name);
    path.reduce(function (result, curr, index, array) {
      if (curr === END) return void 0;
      var next = array[index + 1];
      var value;

      if (isNaN(+next)) {
        value = result[curr] || {};
      } else {
        value = result[curr] || [];
      }

      if (next === END) {
        value = item.value;
      }

      if (result instanceof Array && curr === '') {
        var last = result[result.length - 1];

        if (!last || _typeof(last) !== 'object' || last.hasOwnProperty(next)) {
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