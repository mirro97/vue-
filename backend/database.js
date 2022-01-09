const path = require("path");
const mysql = require("mysql2/promise");
const mybatisMapper = require("mybatis-mapper");

mybatisMapper.createMapper([
  path.join(__dirname, "/service_modules/userInfo.xml"),
  path.join(__dirname, "/service_modules/board_like.xml"),
  path.join(__dirname, "/service_modules/board.xml"),
  path.join(__dirname, "/service_modules/reply.xml"),
]);

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "mynewdb",
  connectionLimit: 20,
});

var format = { language: "sql", indent: "  " };

// board
const board = async (getType) => {
  var param = {
    type: getType,
  };
  var query = mybatisMapper.getStatement("boardView", "select-board-list-all", param, format);
  let connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
    // connection.release();
  }
};

const content = async (boardId) => {
  var param = {
    boardId,
  };

  var query = mybatisMapper.getStatement("board", "select-board-item", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const boardInsert = async (boardInfo) => {
  var param = {
    content: boardInfo.content,
    title: boardInfo.title,
    writer: boardInfo.writer,
  };

  var query = mybatisMapper.getStatement("board", "insert-board", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const boardDelete = async (boardInfo) => {
  var param = {
    boardId: boardInfo,
  };

  var query = mybatisMapper.getStatement("board", "delete-board", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const getLikeList = async (userInfo) => {
  var param = {
    boardId: userInfo.getBoardId,
    writer: userInfo.getUserId,
  };

  var query = mybatisMapper.getStatement("board_like", "select-like-list", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    return "이미 등록";
  } finally {
    if (connection != null) connection.destroy();
  }
};

const clickLike = async (userInfo) => {
  var param = {
    boardId: userInfo.getBoardId,
    writer: userInfo.getUserId,
  };

  var query = mybatisMapper.getStatement("board_like", "insert-like", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    return "이미 등록";
  } finally {
    if (connection != null) connection.destroy();
  }
};

// reply
const reply = async (boardId) => {
  var param = {
    boardId,
  };

  var query = mybatisMapper.getStatement("reply", "select-reply-list", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const replyInsert = async (replyInfo) => {
  var param = {
    boardId: replyInfo.boardId,
    writer: replyInfo.writer,
    content: replyInfo.content,
  };

  var query = mybatisMapper.getStatement("reply", "insert-reply", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const replyDelete = async (replyInfo) => {
  var param = {
    replyId: replyInfo,
  };

  var query = mybatisMapper.getStatement("reply", "delete-reply", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

// user
const userInfo = async (userId) => {
  var param = {
    id: userId,
  };

  var query = mybatisMapper.getStatement("user", "select-user-list", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const updateUserInfo = async (userInfo) => {
  var param = {
    nickname: userInfo.nickname,
    introduce: userInfo.introduce,
    imageUrl: userInfo.imageUrl,
    id: userInfo.id,
  };

  var query = mybatisMapper.getStatement("user", "update-user", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

const deleteUserInfo = async (userInfo) => {
  var param = {
    id: userInfo.id,
  };

  var query = mybatisMapper.getStatement("user", "delete-user", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

// login
const login = async (loginInfo) => {
  var param = {
    id: loginInfo.getId,
    pw: loginInfo.getPassword,
  };

  var query = mybatisMapper.getStatement("user", "login-user", param, format);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    let [rows, fields] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection != null) connection.destroy();
  }
};

// select ("boardView", "select-board-list-all",{});

// const database =  {};
// // crud
// database.select = async (namespace, sqlId, params) => {

//   var query = mybatisMapper.getStatement(namespace, sqlId, params, format);
//   let connection = await pool.getConnection(async (conn) => conn);

//   try {
//     let [rows, fields] = await connection.query(query);
//     return rows;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     if (connection != null) connection.destroy();
//   }
// }
// module.exports = database;

module.exports = { board, content, reply, boardInsert, boardDelete, getLikeList, clickLike, replyDelete, replyInsert, userInfo, updateUserInfo, deleteUserInfo, login };
