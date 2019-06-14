import { stringToArray, stringToTree } from './parse'

test('test stringToArray from query string', () => {
    expect(stringToArray('?foo=bar'))
        .toEqual([{name: 'foo', value: 'bar'}]);
});

test('test stringToArray from query string with hash', () => {
    expect(stringToArray('?foo=bar#foo=bar1'))
        .toEqual([{name: 'foo', value: 'bar'}]);
});

test('test stringToArray from query string with host', () => {
    expect(stringToArray('https://foo.bar/foo/bar?foo=bar'))
        .toEqual([{name: 'foo', value: 'bar'}]);
});

test('test stringToTree simple', () => {
    expect(stringToTree('?foo=bar')).toEqual({
        foo: 'bar'
    });
});

test('test stringToTree single nested', () => {
    expect(stringToTree('?foo[bar]=bar')).toEqual({
        foo: {
            bar: 'bar'
        }
    });
});

test('test stringToTree, expected object with numbers', () => {
    expect(stringToTree('?first=1&second=2')).toEqual({
        first: 1,
        second: 2
    });
});

test('test stringToTree, expected array of string', () => {
    expect(stringToTree('?array[]=foo&array[]=bar')).toEqual({
        array: [
            'foo', 
            'bar'
        ]
    });
});

test('test stringToTree, expected array of boolean', () => {
    expect(stringToTree('?array[]=true&array[]=true&array[]=false')).toEqual({
        array: [
            true, 
            true,
            false
        ]
    });
});

test('test stringToTree, expected array of boolean without conversion', () => {
    expect(stringToTree('?array[]=true&array[]=true&array[]=false', { conversion: false })).toEqual({
        array: [
            'true', 
            'true',
            'false'
        ]
    });
});

test('test stringToTree, expected array of flat objects', () => {
    expect(stringToTree('?array[][foo]=bar&array[][foo]=bar&array[][foo]=bar')).toEqual({
        array: [
            {foo: 'bar'}, 
            {foo: 'bar'},
            {foo: 'bar'}
        ]
    });
});

test('test stringToTree, expected array of flat nested objects', () => {
    expect(stringToTree('?array[0][foo][bar][0]=bar&array[0][foo][bar][1]=bar')).toEqual({
        array: [
            {
                foo: {
                    bar: ['bar', 'bar']
                }
            }
        ]
    });
});