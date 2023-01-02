const express = require("express");
const pool = require("../mysql/pool");
const router = express.Router();

router.get("/", (req, res) => {
  sql = "select * from customers";
  pool.query(sql, (err, result, fields) => {
    //필드는 잘 쓰지않음, 생략가능
    res.render("customer", { list: result }); //랜더링 된 결과물을 클라이언트로 응답한다
  });
});

module.exports = router;
