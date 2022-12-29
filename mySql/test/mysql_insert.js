/*insert.js */
const mysql = require("mysql"); //mysql 모듈로드

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

//등록할 데이터를 넘겨줘야 함
sql = "insert into customers set ?";
let data = {
  name: "최득팔",
  email: "cc@ccc.ccc",
  phone: "010-001-3333",
  address: "",
};

//등록완료인지 에러인지 확인해주는 곳
connection.query(sql, data, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

//DB 접속종료
connection.end();
