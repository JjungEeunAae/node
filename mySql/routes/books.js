var express = require("express");
const pool = require("../test/pool");
var router = express.Router();

sql = {
  select: "select * from books order by title",
  selectOne: "select * from books where no = ?",
  insert: "insert into books set ?",
  update: "update books set ? where no = ?",
  delete: "delete from books where no = ?",
};

//! 전체조회
router.get("/", (req, res) => {
  pool.query(sql.select, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//! 단건조회,,아이디값 받아오기
router.get("/:no", (req, res) => {
  const no = req.params.no;
  pool.query(sql.selectOne, no, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json(results[0]);
  });
});

//! 등록
router.post("/", (req, res) => {
  pool.query(sql.insert, req.body, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//! 수정,아이디값 받아오기
router.put("/:no", (req, res) => {
  const no = req.params.no;
  pool.query(sql.update, [req.body, no], (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//! 삭제,아이디값 받아오기
router.delete("/:no", (req, res) => {
  const no = req.params.no;
  pool.query(sql.delete, no, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//! 라우터 객체를 웹서버(app.js)로 모듈화
module.exports = router;
