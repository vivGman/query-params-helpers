<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [parse][1]
    -   [Parameters][2]
    -   [Examples][3]

## parse

Парсит параметры из строки поиска или URL

### Parameters

-   `queryString` **[String][4]** Строка запроса
-   `options` **[Object][5]**  (optional, default `{output:'tree',typeConversion:true}`)
    -   `options.output` **[String][4]** Формат вывода array, tree
    -   `options.typeConversion` **[Boolean][6]** Приведение типов

### Examples

```javascript
parse('?foo=1&bar[x]=2&bar[y]=3') // { foo: 1, bar: { x: 1, y: 2 } }
```

Returns **([Object][5] \| [Array][7])** 

[1]: #parse

[2]: #parameters

[3]: #examples

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
