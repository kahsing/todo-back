const express = require("express");
const router = express.Router();
const Constants = require("../config/Constants");
const moment = require("moment");

router.post("/todo/list", async (req, res) => {
  try {
    const result = await dbGetAll("ToDo");
    res.json(result);
  } catch (e) {
    res.json("Unexpected Server Error!");
  }
});
router.post("/todo/add", async (req, res) => {
  try {
    const { todo } = req.body;
    let result = await dbCreate("ToDo", todo);
    if (result.data.id) {
      res.json(result.data);
    }
  } catch (e) {
    res.status(500).send({
      ok: false,
      error: {
        reason: "ToDo Add Failed",
        code: 500,
        others: e.errmsg,
      },
    });
  }
});
router.put("/todo/edit", async (req, res) => {
  try {
    let { todo } = req.body;
    let qr = {
      uid: todo.uid,
    };
    query = {
      ...todo,
      ...{ dateUpdated: moment().format(Constants.DATEFORMAT.DATETIME24) },
    };
    const params = {
      table: "ToDo",
      query: qr,
      queryReq: query,
    };

    let result = await dbUpdate(params);

    if (is_empty(result.error)) {
      res.json(result.data);
    } else {
      res.json(result.error);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      ok: false,
      error: {
        reason: "ToDo Update Failed",
        code: 500,
        others: e.errmsg,
      },
    });
  }
});

router.delete("/todo/delete/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    let todo = await dbDelete("ToDo", { uid });
    if (todo.data.deletedCount) {
      res.json(todo.data);
    }
  } catch (e) {
    res.status(500).send({
      ok: false,
      error: {
        reason: "ToDo Delete Failed",
        code: 500,
        others: e.errmsg,
      },
    });
  }
});

module.exports = router;
