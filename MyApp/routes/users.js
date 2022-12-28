var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//따로 집어넣은 곳
router.post("/login", function (req, res) {
  // console.log("req.query.email");
  req.session.email = req.body.email; //post 파라미터
  req.session.is_logined = true;
  // req.session.save((err) => {
  //   if (err) throw err;
  res.redirect("/");
  // });
});
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  req.redirect("/login.html");
});

module.exports = router;
