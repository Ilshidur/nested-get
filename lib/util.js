function isObject(val) {
  return typeof val === 'object' && !Array.isArray(val);
}
function isArray(val) {
  return typeof val === 'object' && Array.isArray(val);
}

module.exports.isObject = isObject;
module.exports.isArray = isArray;
