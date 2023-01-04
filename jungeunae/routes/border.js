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
    commentDelete: "delete from boarder_comment where no = ?",
};

//!조회수

//!전체조회
router.get("/", (req, res) => {
    pool.query(sql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(req.session);
        res.render("border", {
            islogin: req.session.islogin,
            userid: req.session.userid,
            list: result,
        });
    });
});

// ! 글 작성 페이지 이동 (/border라는 url이 생략이 되어 있음)
router.get("/writePage", (req, res) => {
    pool.query(sql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Result => ${JSON.stringify(result)}`);
        res.render("borderOne", {
            islogin: req.session.islogin,
            userid: req.session.userid,
            list: result,
        });
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

// ! 글 수정페이지 ( 이동 )
router.get("/borderPut/:no", (req, res) => {
    sql = "select * from freeboard where no = ?";
    const no = req.params.no;
    pool.query(sql, no, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("borderPut", { list: result });
    });
});

// ! 글 수정페이지 ( 게시글 수정 )
router.put("/borderPut/:no", (req, res) => {
    let data = [req.body, req.params.no];
    pool.query(sql.update, data, (err, result) => {
        let resultData = {};
        if (result.changedRows > 0) {
            resultData.result = true;
            resultData.data = req.body;
        } else {
            resultData.result = false;
        }
        res.send(resultData);
    });
});

// ! 글 클릭하면 단건조회 페이지 이동
router.get("/borderLook/:no", (req, res) => {
    const no = req.params.no;
    pool.query(sql.selectOne, no, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("borderLook", {
            islogin: req.session.islogin,
            userid: req.session.userid,
            list: result,
            bo_id: no,
        });
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

// ! 댓글 삭제
router.delete("/comment/:no", (req, res) => {
    const no = req.params.no;
    pool.query(sql.commentDelete, no, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

module.exports = router;
