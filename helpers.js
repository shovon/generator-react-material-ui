module.exports.createClassName = function (unformattedName) {
  return unformattedName.split(/\s+/).map(function (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
  }).join('');
}
