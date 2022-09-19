import * as pbs from "https://cdn.skypack.dev/protocol-buffers-schema@3.6.0";
import * as pbf from "https://cdn.skypack.dev/pbf@3.2.1";

export function parseSchema(proto) {
  return pbs.parse(proto);
}

export function getReader(schema, messageType) {
  if (typeof schema === "string") {
    schema = parseSchema(schema);
  }
}
