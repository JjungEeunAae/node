//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

//전체조회
router.get("/", (req, res) => {
  sql = "select * from jungeunae";
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render("border", { list: result });
  });
});

module.exports = router;
