/** @format */

//const cookieParser = require("cookie-parser");
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

loginsql = {
    select: "select * from jungeunae", //조회
    selectOne: "select * from jungeunae where userid = ?", //단건조회
    insert: "insert into jungeunae set ?", //등록
    view: "UPDATE jungeunae SET views = views + 1 WHERE no = ?", //조회수증가
    update: "update jungeunae set ? where no = ?", //수정
    delete: "delete from jungeunae where no = ?", //삭제
};

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//!로그인 정보 가져오기
router.get("/", (req, res) => {
    pool.query(loginsql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

//!단건조회
router.post("/login", (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    pool.query(loginsql.selectOne, userid, (err, result) => {
        //일치한 정보가 있으면 다음 페이지로 넘어가고
        if (result.length > 0) {
            console.log("login success!!");
            req.session.islogin = true;
            res.send({ result: true });
        } else {
            //아니면 경고창 띄우기
            console.log("loing failure!!");
            res.send({ result: false });
        }
    });
});

module.exports = router;
