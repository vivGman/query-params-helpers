"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = stringify;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
function stringify(object) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var _url$split = url.split('?'),
      _url$split2 = _slicedToArray(_url$split, 2),
      _url$split2$ = _url$split2[0],
      path = _url$split2$ === void 0 ? '' : _url$split2$,
      _url$split2$2 = _url$split2[1],
      params = _url$split2$2 === void 0 ? '' : _url$split2$2;

  var queryString = params ? params.split('&') : [];
  object = _objectSpread({}, makePlainObject(object));

  var _loop = function _loop(key) {
    var item = object[key];
    var param = Array.isArray(item) ? item.map(function (value) {
      return "".concat(key, "=").concat(encodeURIComponent(value));
    }).join('&') : "".concat(key, "=").concat(encodeURIComponent(item));
    queryString.push(param);
  };

  for (var key in object) {
    _loop(key);
  }

  return queryString.length ? path + '?' + queryString.join('&') : path;
}

function makePlainObject(obj) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var isArray = obj instanceof Array;
  var result = isArray ? [] : {};

  for (var key in obj) {
    var nextKey = prefix + (prefix ? '[' + key + ']' : key);
    var isAllowedObject = obj[key] instanceof Array || String(obj[key]) === '[object Object]';

    if (isAllowedObject) {
      result = _objectSpread({}, result, makePlainObject(obj[key], nextKey));
    } else {
      result[nextKey] = obj[key];
    }
  }

  return result;
}