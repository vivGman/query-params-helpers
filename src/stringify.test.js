import { treeToString } from './stringify'

test('test treeToString', () => {
    const input = {
        foo: 'bar'
    };
    const output = '?foo=bar'

    expect(treeToString(input)).toBe(output);
});

test('test treeToString hash with array', () => {
    const input = {
        foo: [1, 2]
    };
    const output = '?foo[0]=1&foo[1]=2'
    
    expect(treeToString(input)).toBe(output);
});

test('test treeToString hash with nested array', () => {
    const input = {
        foo: [{
            id: 1
        },{
            id: 2
        }]
    };
    const output = '?foo[0][id]=1&foo[1][id]=2'

    expect(treeToString(input)).toBe(output);
});