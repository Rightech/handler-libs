export function sanitize(hex = "") {
  return (hex || "").toLocaleLowerCase().replace(/[^a-f0-9]/g, "");
}

/**
 * @param {string} hex
 * @returns {DataView}
 */
export function decode(hex) {
  hex = sanitize(hex);

  const a = new Uint8Array(hex.length / 2);
  hex.match(/.{1,2}/g).forEach((v, i) => {
    a[i] = parseInt(v, 16);
  });

  return new DataView(a.buffer);
}

/**
 * @param {ArrayBuffer} buf
 * @returns {string}
 */
export function encode(buf) {
  return [...new Uint8Array(buf)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
