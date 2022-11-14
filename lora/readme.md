
## TS013

- https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api

### Uplink Decode

```js
function decodeUplink(input) {
  const temperature = input.bytes[1];
  const humidity = input.bytes[2];

  return {
    data: { temperature, humidity },
    errors: [],
    warnings: [],
  };
}

export function process(time, payload, fPort) {
  const view = ric.base64.decode(payload);
  
  const input = {
    bytes: [...new Uint8Array(view.buffer)],
    fPort,
    recvTime: new Date(time),
  };
  const output = decodeUplink(input);

  if (output.errors.length) {
    throw new Error(output.errors.join(","));
  }

  return output.data;
}
```
