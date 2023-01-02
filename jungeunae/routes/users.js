var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//!로그인 정보 가져오기
router.get("/", (req, res) => {
  sql = "SELECT * FROM jungeunae";
  pool.query(sql, (err, result) => {
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
  sql = "SELECT * FROM jungeunae WHERE userid=?";
  pool.query(sql, userid, (err, result) => {
    //일치한 정보가 있으면 다음 페이지로 넘어가고
    //아니면 경고창 띄우기
  });
});

module.exports = router;
