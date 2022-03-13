const general_helper = {
  err_template: function(param) {
    const { code, reason, others } = param;
    var msg = {};
    switch (code) {
      case 401:
        msg = {
          ok: false,
          error: {
            code,
            reason,
            others
          }
        };
        break;
      default:
        msg = {
          ok: false,
          error: {
            code,
            reason,
            others
          }
        };
    }

    return msg;
  }
};
module.exports = general_helper;
