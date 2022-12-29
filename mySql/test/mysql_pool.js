/*pool.js*/
const mysql = require("mysql"); //mysql 모듈로드

//mysql 접속정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev",
  connectionLinit: 10,
};

//DB 커넥션 생성
let pool = mysql.createPool(conn);
//pool.getConnection()

//조회할 쿼리
sql = "SELECT * FROM customers";
pool.query(sql, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});
//pool.releace();
