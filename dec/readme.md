

# HEX

## iBeacon example

```js
import * as hex from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.7/dec/hex.js";

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

## Example payload

|         | data type  | endianness | byte offset |
|---------|------------|------------|-------------|
| lat     | float32    | big        | 0           |
| lon     | float32    | big        | 4           |


## Built-in decoder

```js
/**
 * @param {string} payload base64-encoded [lat,lon]
 */
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

## ES module

with [js-base64](https://github.com/dankogai/js-base64)

```js
import { toUint8Array } from "https://raw.githubusercontent.com/dankogai/js-base64/3.7.2/base64.mjs";

/**
 * @param {string} payload base64-encoded [lat,lon]
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

# Binary

with [binary-parser](https://github.com/keichi/binary-parser)

```js
import { Parser as BinaryParser } from "https://esm.sh/binary-parser@2.2.1";

// slightly shortened example from library's readme
const IpHeaderShort = new BinaryParser()
  .endianness("big")
  .bit4("version")
  .bit4("headerLength")
  .uint8("tos")
  .uint16("packetLength")
  .uint16("id");

/**
 * @param {string} payload base64 ip header payload
 */
export function process(payload) {
  const view = ric.base64.decode(payload);
  const { version, tos, id } = IpHeaderShort.parse(view);
  return { version, tos, id };
}

/**
 * @test payload "RQACxZOZAAAsBu+YrcJPbIUBhtE="
 */
```

# Malformed JSON

## JavaScript `eval()`

```js
/**
 * @param {string} payload malformed json
 */
export function process(payload) {
  const { x, y } = eval(`(${payload})`);
  return { x, y };
}

/**
 * @test payload "{x:10, y:'20',}"
 */
```

## JSON5

```js
import JSON5 from "https://unpkg.com/json5@2.2.3/dist/index.min.mjs";

/**
 * @param {string} payload malformed json
 */
export function process(payload) {
  const { x, y } = JSON5.parse(payload);
  return { x, y };
}

/**
 * @test payload "{x:10, y:'20',}"
 */
```

# XML

with [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)

```js
import Parser from "https://cdn.skypack.dev/fast-xml-parser@4.0.10/src/xmlparser/XMLParser.js";

export function process() {
  const xml = new Parser();
  const res = xml.parse(`
    <pos>
      <x>10</x>
      <y>20</y>
    </pos>
  `);

  const { x, y } = res.pos;
  return { x, y };
}
```

# MessagePack

with [@msgpack/msgpack](https://github.com/msgpack/msgpack-javascript)

```js
import { decode } from "https://cdn.skypack.dev/@msgpack/msgpack@2.8.0/dist.es5+esm/decode.mjs";

/**
 * @param {string} payload msgpack-encoded [x,y]
 */
export function process(payload) {
  const { buffer } = ric.base64.decode(payload);
  const { x, y } = decode(buffer);
  return { x, y };
}

/**
 * @test payload "gqF4CqF5FA=="
 */
```
