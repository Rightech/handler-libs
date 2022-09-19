

# HEX

## iBeacon example

```js
import * as hex from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.4/enc/hex.js";

/**
 * @param {string} payload hex-encoded BLE manufacturer data
 */
export function process(payload) {
  const view = hex.decode(payload);

  if (view.getUint16(0) !== 0x4c00 || view.getUint16(2) !== 0x0215) {
    throw new Error("not ibeacon payload");
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

# Base64

## Built-in decoder

```js
export function process(payload) {
  const view = ric.base64.decode(payload);

  const lat = view.getFloat32(0);
  const lon = view.getFloat32(4);

  return { lat, lon };
}

/**
 * @test payload "Ql8Z6EIWn/M="
 */
```

## ESM polyfill

```js
import { toUint8Array } from "https://unpkg.com/js-base64@3.7.2/base64.mjs";

/**
 * @param {string} payload hex-encoded [lat,lon] payload
 */
export function process(payload) {
  const view = new DataView(toUint8Array(payload).buffer);

  const lat = view.getFloat32(0);
  const lon = view.getFloat32(4);

  return { lat, lon };
}

/**
 * @test payload "Ql8Z6EIWn/M="
 */
```