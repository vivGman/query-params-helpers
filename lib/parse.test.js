"use strict";

var _parse = require("./parse");

test('test stringToArray from query string', function () {
  expect((0, _parse.stringToArray)('?foo=bar')).toEqual([{
    name: 'foo',
    value: 'bar'
  }]);
});
test('test stringToArray from query string with hash', function () {
  expect((0, _parse.stringToArray)('?foo=bar#foo=bar1')).toEqual([{
    name: 'foo',
    value: 'bar'
  }]);
});
test('test stringToArray from query string with host', function () {
  expect((0, _parse.stringToArray)('https://foo.bar/foo/bar?foo=bar')).toEqual([{
    name: 'foo',
    value: 'bar'
  }]);
});
test('test stringToTree simple', function () {
  expect((0, _parse.stringToTree)('?foo=bar')).toEqual({
    foo: 'bar'
  });
});
test('test stringToTree single nested', function () {
  expect((0, _parse.stringToTree)('?foo[bar]=bar')).toEqual({
    foo: {
      bar: 'bar'
    }
  });
});
test('test stringToTree, expected object with numbers', function () {
  expect((0, _parse.stringToTree)('?first=1&second=2')).toEqual({
    first: 1,
    second: 2
  });
});
test('test stringToTree, expected array of string', function () {
  expect((0, _parse.stringToTree)('?array[]=foo&array[]=bar')).toEqual({
    array: ['foo', 'bar']
  });
});
test('test stringToTree, expected array of boolean', function () {
  expect((0, _parse.stringToTree)('?array[]=true&array[]=true&array[]=false')).toEqual({
    array: [true, true, false]
  });
});
test('test stringToTree, expected array of boolean without conversion', function () {
  expect((0, _parse.stringToTree)('?array[]=true&array[]=true&array[]=false', {
    typeConversion: false
  })).toEqual({
    array: ['true', 'true', 'false']
  });
});
test('test stringToTree, expected array of flat objects', function () {
  expect((0, _parse.stringToTree)('?array[][foo]=bar&array[][foo]=bar&array[][foo]=bar')).toEqual({
    array: [{
      foo: 'bar'
    }, {
      foo: 'bar'
    }, {
      foo: 'bar'
    }]
  });
});
test('test stringToTree, expected array of flat nested objects', function () {
  expect((0, _parse.stringToTree)('?array[0][foo][bar][0]=bar&array[0][foo][bar][1]=bar')).toEqual({
    array: [{
      foo: {
        bar: ['bar', 'bar']
      }
    }]
  });
});