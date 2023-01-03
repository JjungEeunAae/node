/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

// ! Prefix = /border

sql = {
    select: "select * from freeboard", //조회
    selectOne: "select * from freeboard where no = ?", //단건조회
    insert: "insert into freeboard set ?", //등록
    view: "UPDATE freeboard SET views = views + 1 WHERE no = ?", //조회수증가
    update: "update freeboard set ? where no = ?", //수정
    delete: "delete from freeboard where no = ?", //삭제
    comment: `
      SELECT * 
      FROM boarder_comment`,
    commentInsert: "INSERT into boarder_comment set ?",
};

//!조회수

//!전체조회
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

// ! 글 작성 후 저장
router.post("/writePage", (req, res) => {
    pool.query(sql.insert, req.body, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

// ! 글 클릭하면 단건조회 페이지 이동
router.get("/borderLook/:no", (req, res) => {
    const no = req.params.no;
    pool.query(sql.selectOne, no, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("borderLook", { list: result, bo_id: no });
    });
});

// ! 댓글 전체조회
router.get("/comment", (req, res) => {
    // const bo_id = req.params.bo_id;
    pool.query(sql.comment, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
});

// ! 댓글 등록
router.post("/comment", (req, res) => {
    // const bo_id = req.params.bo_id;
    pool.query(sql.commentInsert, req.body, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});
module.exports = router;
