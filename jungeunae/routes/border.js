/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

// ! Prefix = /border

sql = {
    select: "select * from freeboard", //조회
    insert: "insert into freeboard set ?", //등록
    update: "update freeboard set ? where no = ?", //수정
    delete: "delete from freeboard where no = ?", //삭제
};

//전체조회
router.get("/", (req, res) => {
    pool.query(sql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Result => ${JSON.stringify(result)}`);
        res.render("border", { list: result });
    });
});

// ! 글 작성 페이지 이동 (/border라는 url이 생략이 되어 있음)
router.get("/writePage", (req, res) => {
    pool.query(sql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Result => ${JSON.stringify(result)}`);
        res.render("borderOne", { list: result });
    });
});

router.post("/", (req, res) => {
    pool.query(sql.insert, req.body, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
module.exports = router;
