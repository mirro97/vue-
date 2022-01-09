var express = require("express");
var router = express.Router();

var database = require("../database");
var resData = {};

router.get("/Item", async (req, res, next) => {
  try {
    const getIndex = req.query.userId;
    const getReply = await database.userInfo(getIndex);
    res.send(getReply[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/Update", async (req, res, next) => {
  try {
    const getIndex = req.body.userInfo;
    const getReply = await database.updateUserInfo(getIndex);
    res.send(getReply[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/Delete", async (req, res, next) => {
  try {
    const getIndex = req.body.userInfo;
    const getReply = await database.deleteUserInfo(getIndex);
    res.send(getReply[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get('/Update', async(req, res, next) => {
//   try{
//     const params = req.body.userInfo;

//     const userUpdate = await database.database(params)
//   }catch(error){
//     res.status(500).send(error)
//   }
// })

module.exports = router;
