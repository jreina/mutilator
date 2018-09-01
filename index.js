const always = x => () => x;
const mutations = {
  array: [{ when: 'Is bad', xform: always('bad') }],
  bool: [{ when: 'Is bad', xform: always('bad') }],
  number: [{ when: 'Is bad', xform: always('bad') }],
  object: [{ when: 'Is bad', xform: always('bad') }],
  string: [{ when: 'Is bad', xform: always('bad') }]
};

const _getMutations = obj => {
  if (typeof obj === 'string') {
    return mutations.string;
  } else if (typeof obj === 'number') {
    return mutations.number;
  } else if (typeof obj === 'boolean') {
    return mutations.bool;
  } else if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return mutations.array;
    } else {
      return mutations.object;
    }
  }
};

const of = obj => {
  const pairs = Object.entries(obj);

  return pairs.map(([key, val]) =>
    _getMutations(val).map(mut =>
      Object.assign({}, { when: mut.when, value: mut.xform(val) })
    )
  );
};

console.log(of({ v: {}, w: [], x: 0, y: '0', z: true }));

module.exports = { of };
