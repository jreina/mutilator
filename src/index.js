const _ = require("lodash");
const { mutations } = require("./mutations");

const _getMutations = obj => {
  if (typeof obj === "string") {
    return mutations.string;
  } else if (typeof obj === "number") {
    return mutations.number;
  } else if (typeof obj === "boolean") {
    return mutations.bool;
  } else if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return mutations.array;
    } else {
      return mutations.object;
    }
  }
};

function getPaths(obj, keys = [], path = "") {
  if (typeof obj === "object")
    Object.keys(obj).map(k => {
      const pathStr = path.length === 0 ? k : path + `.${k}`;
      keys.push(pathStr);
      return getPaths(obj[k], keys, pathStr);
    });

  return keys;
}

function mutilate(obj) {
  const paths = getPaths(obj);
  return _.flatMap(paths, path => {
    const val = _.get(obj, path);
    const mutations = _getMutations(val);

    return mutations.map(mutation => ({
      case: mutation.when,
      value: _.set(_.cloneDeep(obj), path, mutation.xform(val)),
      path
    }));
  });
}

module.exports = { mutilate, getPaths };
