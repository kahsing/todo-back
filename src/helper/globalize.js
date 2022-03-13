const globalize = function(helper) {
  for (var prop in helper) {
    const valid = helper.hasOwnProperty(prop);
    valid ? (global[prop] = helper[prop]) : "";
  }
};

module.exports = globalize;
