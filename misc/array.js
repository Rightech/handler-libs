export function chunk(array = [], size = 2) {
  array = [...array];

  const result = [];
  while (array.length) {
    result.push(array.splice(0, size));
  }
  return result;
}

export function unique(array = []) {
  return array.filter((item, pos, self) => {
    return self.indexOf(item) === pos;
  });
}
