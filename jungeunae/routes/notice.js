/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

// sql = {
//     select: "select * from notice", //조회
//     insert: "insert into notice set ?", //등록
//     update: "update notice set ? where no = ?", //수정
//     delete: "delete from notice where no = ?", //삭제
// };

//전체조회
router.get("/", (req, res) => {
    res.render("notice");
});

module.exports = router;
