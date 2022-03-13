const ToDo = require("../models/ToDo");

const Constants = require("../config/Constants");
const moment = require("moment");

const DbModel = {
  ToDo: ToDo,
};

function errorHandler(mongoError) {
  let computedErrors = [];

  if (!is_empty(mongoError["reason"])) {
    // Type Error : Detected 1
    const { kind, value, path } = mongoError;
    computedErrors.push(
      `Field: ${path}, expected *${kind}*; receive '${value}'`
    );
  }

  if (!is_empty(mongoError["errors"])) {
    for (var field in mongoError["errors"]) {
      const { message, kind, path, value } = mongoError["errors"][field];
      computedErrors.push(
        `${message}
        (Field: ${path}, expected *${kind}*; receive '${value})'`
      );
    }
  }
  computedErrors = computedErrors.join(", ");
  return computedErrors;
}

const mod_db = {
  dbGetAll: async function (table, params) {
    return params
      ? await DbModel[table].find(params).sort({ createdAt: "desc" })
      : await DbModel[table].find({}).sort({ createdAt: "desc" });
  },
  dbGetOne: async function (table, params) {
    return await DbModel[table].findOne(params);
  },
  dbCreate: async function (table, params) {
    let result = {};
    params = {
      ...params,
      ...{ dateCreated: moment().format(Constants.DATEFORMAT.DATETIME24) },
    };

    let err = await new DbModel[table](params)
      .validate()
      .catch((errors) => errors);
    if (!is_empty(err)) {
      result["error"] = errorHandler(err);
      console.log(result);
    } else {
      result["data"] = await new DbModel[table](params).save();
    }
    return result;
  },
  dbUpdate: async function (params) {
    let options = { useFindAndModify: false, new: true };
    const { table, query, queryReq } = params;

    let result = {};
    let err = await DbModel[table].findOneAndUpdate(query, queryReq, options);

    if (!is_empty(err)) {
      result["error"] = errorHandler(err);
      result["data"] = await dbGetOne(table, query);
    } else {
      result = err;
    }
    return result;
  },
  dbDelete: async function (table, { uid }) {
    let result = {};
    let err = await DbModel[table]
      .deleteOne({ uid })
      .catch((errors) => console.log("errors", errors));
    if (!err.ok) {
      result["error"] = errorHandler(err);
    } else {
      result["data"] = err;
    }
    return result;
  },
};

module.exports = mod_db;
