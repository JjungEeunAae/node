/*update.js*/
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

//첫번째 들어갈 내용, 두번째 들어갈 내용,아이디(필수값)
sql = "update customers set ? where id=?";
let data = [{ email: "dd@ddd.ddd", name: "춘팔득" }, 3];

//등록완료인지 에러인지 확인해주는 곳
connection.query(sql, data, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

//DB 접속종료
connection.end();
