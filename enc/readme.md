

# HEX

## iBeacon example

```js

import * as hex from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.4/enc/hex.js";

/**
 * @param {number} payload hex-encoded BLE manufacturer data
 */
export default function process(payload) {
  const view = hex.decode(payload);

  if (view.getUint16(0) !== 0x4c00) {
    throw new Error("[ble] not apple");
  }
  if (view.getUint16(2) !== 0x0215) {
    throw new Error("[ble] not ibeacon");
  }

  const uuid = hex.encode(view.buffer.slice(4, 20));
  const major = view.getUint16(20);
  const minor = view.getUint16(22);
  const rssi = view.getInt8(24);

  return { uuid, major, minor, rssi };
}

/**
 * @test payload "4c00021500112233445566778899aabbccddeeff01234567fc"
 */
```
