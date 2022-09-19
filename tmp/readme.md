
## Hello world

```js
import { sum } from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.5/tmp/example.js";;

/**
 * @param {number} a example value #1
 * @param {number} b example value #2
 */
export function process(a, b) {
  return {
    sum: sum(a, b),
  };
}
```