/** @format */

//const cookieParser = require("cookie-parser");
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

loginsql = {
  select: "select * from jungeunae", //조회
  selectOne: "select * from jungeunae where userid = ?", //단건조회
  insert: "insert into jungeunae set ?", //등록
  view: "UPDATE jungeunae SET views = views + 1 WHERE no = ?", //조회수증가
  update: "update jungeunae set ? where no = ?", //수정
  delete: "delete from jungeunae where no = ?", //삭제
};

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   req.session.destroy();
//   res.send("respond with a resource");
// });

//!로그인 정보 가져오기
router.get("/", (req, res) => {
  pool.query(loginsql.select, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

//! 회원가입 html
// router.post("/sign", (req, res) => {
//   pool.query(loginsql.insert, req.body, function (err, results, fields) {
//     console.log(results);
//     //res.send(results);
//     res.redirect("/login.html");
//   });
// });

//! sign EJS
router.get("/sign", (req, res) => {
  pool.query(loginsql.select, function (err, results, fields) {
    console.log(results);
    res.render("sign");
  });
});

//! 회원가입 시 회원정보를 등록하는 부분
router.post("/sign", (req, res) => {
  pool.query(loginsql.insert, req.body, function (err, results, fields) {
    console.log(results);
    req.session.destroy();
    res.send(results);
  });
});

//! login EJS
router.get("/login", (req, res) => {
  pool.query(loginsql.select, (err, results, fields) => {
    res.render("login");
  });
});

//!단건조회 / 로그인 후 전체게시판으로 이동
router.post("/login", (req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  pool.query(loginsql.selectOne, userid, (err, result) => {
    console.log(result);
    if (result.length == 0) {
      console.log("loing failure!!");
      res.write("<script>alert('Not a Member!')</script>");
      res.write('<script>window.location="../users/login"</script>');
      return;
    }
    //일치한 정보가 있으면 다음 페이지로 넘어가고
    if (result[0].userpw == userpw) {
      //DB에 있는 로그인 정보가 html form에 있는 name과 같을 때,
      console.log(req.session);
      req.session.islogin = true; //session에 로그인여부 값을 넣어준다
      req.session.userid = userid; //session에 아이디 값을 넣어준다
      res.write("<script>alert('Wellcome!')</script>");
      res.write('<script>window.location="../border"</script>');
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login");
});

module.exports = router;
