/*select.js*/
const mysql = require("mysql"); //mysql 모듈로드

//mysql 접속정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev",
};

//DB 커넥션 생성
let connection = mysql.createConnection(conn);
connection.connect(); //DB 접속

//조회할 쿼리
sql = "SELECT * FROM customers";
connection.query(sql, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

//DB 접속종료
connection.end();
