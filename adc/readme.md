

## Table

### Source table

| 0,0 | 6,8 | 7,2 | 7,5 | 8,0 |
|-----|-----|-----|-----|-----|
| 0   | 1   | 5   | 17  |  22 |

### Supported input format

#### json

```json
[[0, 0], [6.8, 1], [7.2, 5], [7.5, 17], [8, 22]]
```

#### csv
```csv
0,0; 6.8,1; 7.2,5; 7.5,17; 8,22
```


### Piecewise linear approximation
```js

import { piecewise } from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.3/adc/table.js";

/**
 * @param {number} adc1 adc value from object packet
 * @param {string} table1 adc table from object config
 */
export default function process(adc1, table1) {
  const value1 = piecewise(table1)(adc1);

  return { value1 };
}

/**
 * @test adc1 3.14
 * @test table1 "[[0, 0], [6.8, 1], [7.2, 5]]"
 */
```
