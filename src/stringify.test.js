import { stringify } from './stringify'

test('test stringify', () => {
    const input = {
        foo: 'bar'
    };
    const output = '?foo=bar'

    expect(stringify(input)).toBe(output);
});

test('test stringify hash with array', () => {
    const input = {
        foo: [1, 2]
    };
    const output = '?foo[0]=1&foo[1]=2'
    
    expect(stringify(input)).toBe(output);
});

test('test stringify hash with nested array', () => {
    const input = {
        foo: [{
            id: 1
        },{
            id: 2
        }]
    };
    const output = '?foo[0][id]=1&foo[1][id]=2'

    expect(stringify(input)).toBe(output);
});