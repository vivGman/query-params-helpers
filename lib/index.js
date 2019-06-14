'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parse.parse;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function get() {
    return _stringify.stringify;
  }
});
exports["default"] = void 0;

var _parse = require("./parse.js");

var _stringify = require("./stringify.js");

var _default = {
  parse: _parse.parse,
  stringify: _stringify.stringify
};
exports["default"] = _default;