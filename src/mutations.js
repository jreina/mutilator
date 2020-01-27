const always = x => () => x;
const genericMutations = [
  { when: "is null", xform: always(null) },
  { when: "is undefined", xform: always(undefined) },
  { when: "is 0", xform: always(0) },
  { when: "is -1", xform: always(-1) },
  { when: "is 1", xform: always(1) }
];

module.exports = {
  mutations: {
    array: genericMutations,
    bool: genericMutations,
    number: genericMutations,
    object: genericMutations,
    string: genericMutations
  },
  overrideType(type, mutations) {
      this.mutations[type] = mutations
  },
  addToType(type, mutations) {
      this.mutations[type].push(...mutations);
  }
};
