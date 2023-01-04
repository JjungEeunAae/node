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

//pool.query(sql, data, (err, results, fields)=>{}) // 자체를 promise로 바꿔줄꺼임

function query(sql, data) {
  return new Promise((resolve, reject) => {
    pool.query(sql, data, (err, results, fields) => {
      resolve(results);
    });
  });
}

module.exports = { pool, query }; // pool : 필드명 , query : 필드값 // 생략해도 상관없음
