const path = require("path");
const mybatisMapper = require("mybatis-mapper");

const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "mynewdb",
});
var param = {
  test_id: 2,
};

var format = { language: "sql", indent: "  " };
mybatisMapper.createMapper([path.join(__dirname, "/service_modules/user_info.xml")]);

console.log(query);
var query = mybatisMapper.getStatement("user", "select-user-list", param, format);
connection.query(query, function (error, results, fields) {
  if (error) console.log(error);

  console.log(results);
});
