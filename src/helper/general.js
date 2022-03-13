const general_helper = {
  is_empty: function(value) {
    if (
      typeof value === "undefined" ||
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return true;
    } else {
      if (typeof value === "object") {
        if (Object.keys(value).length === 0 && value.constructor === Object) {
          return true;
        }
      }
    }

    return false;
  }
};
module.exports = general_helper;
