import { chunk } from "https://raw.githubusercontent.com/rightech/handler-libs/1.0.6/misc/array.js";

export function ensureTable(value) {
  let table = value;
  if (!Array.isArray(value)) {
    table = parseTable(value);
  }

  /* ensure all table pairs to be numbers */
  table = table
    .map(([x, y]) => [
      parseFloat(x && x.toString()),
      parseFloat(y && y.toString()),
    ])
    .filter(([x, y]) => isFinite(x) && isFinite(y));
  return table;
}

export function parseTable(raw) {
  raw = (raw || "").toString();

  try {
    const json = JSON.parse(raw);
    if (typeof json === "string") {
      // already should be array here,
      // but let's try another one
      return JSON.parse(json);
    }
    return json;
  } catch {}

  const cells = raw
    .split(";")
    .map((x) => x.trim())
    .filter((x) => !!x)
    .map((x) => x.trim())
    .flatMap((x) => x.split(","))
    .map((x) => x.trim())
    .map((x) => +x);

  return chunk(cells, 2);
}

export function piecewise(table) {
  if (!Array.isArray(table)) {
    table = ensureTable(table);
  }

  if (!table || !table.length) {
    throw new Error("[adc] empty table");
  }

  return function (x) {
    // bisect
    let lo = 0;
    let hi = table.length - 1;

    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;

      if (x < table[mid][0]) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    // project
    return (
      table[lo][1] +
      ((table[hi][1] - table[lo][1]) / (table[hi][0] - table[lo][0])) *
        (x - table[lo][0])
    );
  };
}
