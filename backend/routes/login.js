var express = require("express");
var router = express.Router();

var database = require("../database");
var resData = {};

router.post("/login", async (req, res, next) => {
  try {
    const getId = req.body.id;
    const getPassword = req.body.password;

    const loginInfo = { getId, getPassword };
    const authCheck = await database.login(loginInfo);

    if (authCheck.length === 0) {
      resData = "사용자 정보가 없습니다";
      res.send(resData);
    } else {
      res.send(authCheck[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
