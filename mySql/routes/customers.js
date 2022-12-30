/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러(router)를 실행
//! 실행 후 client.js로 빠르게 respon(응답)

var express = require("express");
const pool = require("../test/pool");
var router = express.Router();

//!전체조회
router.get("/", (req, res) => {
  sql = "SELECT * FROM customers";
  pool.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//!단건조회
router.get("/:id", (req, res) => {
  const id = req.params.id;
  sql = "SELECT * FROM customers where id=?";
  pool.query(sql, id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results[0]);
  });
});

//!등록
router.post("/", (req, res) => {
  sql = "insert into customers set ?";
  pool.query(sql, req.body, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//!수정
router.put("/:id", (req, res) => {
  //? URL의 파라미터를 읽어냄
  //const id = req.params.id;
  //? MySQL 명령어, ?는 값이 들어갈 곳을 표시한 것
  sql = `update customers set ? where id = ?`;
  let data = [req.body, req.params.id];
  //? 필요한 정보를 DB로 요청, 요청할 정보는 body의 정보와 필수값인 id
  pool.query(sql, data, function (err, results, fields) {
    console.log(sql);
    let resultData = {};
    if (err) {
      console.log(err);
      throw err;
    } else if (results.changedRows > 0) {
      resultData.results = true;
      resultData.data = req.body;
    } else {
      resultData.results = false;
    }
    res.json(resultData);
    //res.send(results);
  });
});

//!삭제
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  sql = "delete from customers where id = ?";
  pool.query(sql, id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    //res.statusCode=200; , res.end();      =정상처리
    res.send(results);
  });
});

module.exports = router;
