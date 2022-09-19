

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

export default function process(adc1, table1) {
  const value1 = piecewise(table1)(adc1);

  return { value1 };
}

```