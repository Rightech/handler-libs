import { toUint8Array } from "https://raw.githubusercontent.com/dankogai/js-base64/3.7.2/base64.mjs";

/**
 * @param {string} b64
 * @returns {DataView}
 */
export function decode(b64) {
  const a = toUint8Array(b64);
  return new DataView(a.buffer);
}

export { toUint8Array };
