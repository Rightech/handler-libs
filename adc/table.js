export function chunk(array = [], size = 2) {
  array = [...array];

  const result = [];
  while (array.length) {
    result.push(array.splice(0, size));
  }
  return result;
}

export function ensure(value) {
  let table = value;
  if (!Array.isArray(value)) {
    table = parse(value);
  }

  /* ensure all table pairs to be numbers */
  table = table.map(([a, b]) => [
    parseFloat(a.toString()),
    parseFloat(b.toString()),
  ]);
  return table;
}

export function parse(raw) {
  raw = raw.toString();

  try {
    return JSON.parse(raw);
  } catch {}

  const cells = raw
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => !!x)
    .map((x) => x.replace(",", ""))
    .map((x) => x.trim())
    .map((x) => +x);

  return chunk(cells, 2);
}

export function piecewise(table) {
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
