var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource~!!!!");
});

router.post("/login", function (req, res) {
  //로그인 정보를 확인 및 정보를 저장
  req.session.email = req.body.email; //post 파라미터
  req.session.is_logined = true;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.post("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/login.html");
});

module.exports = router;
