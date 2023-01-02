/*pool.js*/
const mysql = require("mysql"); //mysql 모듈로드

//mysql 접속정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev",
  connectionLimit: 10,
};

//DB 커넥션 생성
let pool = mysql.createPool(conn);

module.exports = pool;
