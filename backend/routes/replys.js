var express = require("express");
var router = express.Router();

var database = require("../database");
var resData = {};

router.get("/", async (req, res, next) => {
  try {
    const getIndex = req.query.boardID;
    const getReply = await database.reply(getIndex);
    res.send(getReply);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/Insert", async (req, res, next) => {
  try {
    const getReplyData = req.body.replyData;
    await database.replyInsert(getReplyData);
    resData = "등록이 완료되었습니다";
  } catch (error) {
    res.status(500).send(error);
  }
  res.json(resData);
});

router.post("/Delete", async (req, res, next) => {
  try {
    const getReplyData = req.body.replyId;
    await database.replyDelete(getReplyData);
    resData = "삭제가 완료되었습니다";
  } catch (error) {
    res.status(500).send(error);
  }
  res.json(resData);
});
module.exports = router;
