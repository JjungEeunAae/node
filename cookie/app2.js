//! express 사용했을 경우
const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  //쿠키를 읽어내고
  console.log("Cookies:", req.cookies); //test 의 정보를 읽어내고 싶으면 cookies.test 해주면 됨
  //쿠키의 값을 보낼 수 있다.
  res.cookie("test", "test");
  //응답종료
  res.send("express");
});

app.listen(3000, () => {
  console.log("server runnig http://localhost:3000");
});

//npm install express
//npm install cookie-parser
//var cookieParser = require('cookie-parser')
//app.use(cookieParser())

//npm install cookie-session
//var cookieSession = require('cookie-session')
