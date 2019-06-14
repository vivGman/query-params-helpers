"use strict";

var _stringify = require("./stringify");

test('test treeToString', function () {
  var input = {
    foo: 'bar'
  };
  var output = '?foo=bar';
  expect((0, _stringify.treeToString)(input)).toBe(output);
});
test('test treeToString hash with array', function () {
  var input = {
    foo: [1, 2]
  };
  var output = '?foo[0]=1&foo[1]=2';
  expect((0, _stringify.treeToString)(input)).toBe(output);
});
test('test treeToString hash with nested array', function () {
  var input = {
    foo: [{
      id: 1
    }, {
      id: 2
    }]
  };
  var output = '?foo[0][id]=1&foo[1][id]=2';
  expect((0, _stringify.treeToString)(input)).toBe(output);
});