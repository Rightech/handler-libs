

## Usage

With [pbf](https://github.com/mapbox/pbf) library

### Example Protocol Buffers file `example.proto`

```proto
syntax = "proto3";

message Position {
    double lat = 1;
    double lon = 2;
    sint32 x = 3;
    sint32 y = 4;
}
```

Using `pbf` CLI tool: 

1. Compile reader code
```sh
> npx pbf example.proto --browser --no-write
```
2. And copy/paste compiled code from stdout to handler code


### Example handler code
```js
import Pbf from "https://cdn.skypack.dev/pbf@3.2.1";

// declare non-standard `self` variable, because it's used in generated code
var self = {};


// #region code generated by pbf v3.2.1

// Position ========================================

var Position = self.Position = {};

Position.read = function (pbf, end) {
    return pbf.readFields(Position._readField, {lat: 0, lon: 0, x: 0, y: 0}, end);
};
Position._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.lat = pbf.readDouble();
    else if (tag === 2) obj.lon = pbf.readDouble();
    else if (tag === 3) obj.x = pbf.readSVarint();
    else if (tag === 4) obj.y = pbf.readSVarint();
};
// #endregion


export default function process(payload) {
  const { buffer } = ric.base64.decode(payload);
  const pbf = new Pbf(buffer);

  const { lat, lon, x, y } = Position.read(pbf);
  return { lat, lon, x, y };
}
```