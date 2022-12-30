var express = require("express");
const pool = require("../../mySql/test/pool");
var router = express.Router();

sql = {
  select: "select * from board order by title", //조회
  insert: "insert into board set ?", //등록
  update: "update board set ? where no = ?", //수정
  delete: "delete from board where no = ?", //삭제
};

//!게시글 조회
router.get("/", (req, res) => {
  pool.query(sql.select, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//!게시글 등록
router.post("/", (req, res) => {
  pool.query(sql.insert, req.body, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//!게시글 수정
router.put("/:no", (req, res) => {
  const no = req.params.no;
  pool.query(sql.update, [req.body, no], (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//!게시글 삭제
router.delete("/:no", (req, res) => {
  const no = req.params.no;
  pool.query(sql.delete, no, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//! 라우터 객체를 웹서버(app.js)로 모듈화
module.exports = router;
