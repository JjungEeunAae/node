/** @format */

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
    const id = req.params.id;
    //? MySQL 명령어, ?는 값이 들어갈 곳을 표시한 것
    sql = `update customers set ? where id = ?`;
    //? MySQL의
    pool.query(sql, [req.body, id], function (err, results, fields) {
        console.log(sql);
        if (err) {
            console.log(err);
        }
        res.send(results);
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
