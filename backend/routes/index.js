var express = require("express");
var router = express.Router();

var database = require("../database");
var resData = {};
/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const getType = req.query.type;
    const getBoard = await database.board(getType);
    res.send(getBoard);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/board", async (req, res, next) => {
  try {
    const getBoard = await database.board();
    res.send(getBoard);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/Content", async (req, res, next) => {
  try {
    const getIndex = req.query.boardId;
    const getContent = await database.content(getIndex);
    res.send(getContent[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/Insert", async (req, res, next) => {
  try {
    const getBoardInfo = req.body.boardData;
    await database.boardInsert(getBoardInfo);
    resData = "새로운 글 등록이 완료되었습니다";
  } catch (error) {
    res.status(500).send(error);
  }
  res.json(resData);
});

router.post("/Delete", async (req, res, next) => {
  try {
    const getBoardInfo = req.body.boardId;
    await database.boardDelete(getBoardInfo);
    resData = "게시글 삭제가 완료되었습니다";
  } catch (error) {
    res.status(500).send(error);
  }
  res.json(resData);
});

router.get("/Like", async (req, res, next) => {
  try {
    const getBoardId = req.query.boardId;
    const getUserId = req.query.id;
    const userInfo = { getBoardId, getUserId };
    const data = await database.getLikeList(userInfo);

    const likeList = [];
    for (dataIndex in data) {
      likeList.push(data[dataIndex].writer);
    }
    res.send(likeList);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/Like", async (req, res, next) => {
  try {
    const getBoardId = req.body.boardId;
    const getUserId = req.body.id;
    const userInfo = { getBoardId, getUserId };
    const data = await database.clickLike(userInfo);
    if (data === "이미 등록") {
      resData = { message: "이미 좋아요를 누르셨습니다.", isLiked: false };
    } else {
      resData = { message: "좋아요를 눌렀습니다.", isLiked: true };
    }
  } catch (error) {
    res.status(500).send(error);
  }
  res.json(resData);
});

module.exports = router;
