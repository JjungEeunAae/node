import express from "express";
import boardRouter from "./routes/board.js";
import customerRouter from "./routes/customer.js";
const app = express();
//서버 포트 번호
const port = 3000;

//경로안에 있는 파일을 URL로 제공
//express 앞에 "" 안에 가상경로를 넣을 수 있음
//route로 인해 경로가 많아지면 사용에 용의함
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.get("/login", (req, res) => {
  console.log(req.query.email);
  console.log(req.query.pw);
  res.send("로그인완료");
});

app.use("/board", boardRouter);
app.use("/customer", customerRouter);
app.use(function (err, req, res, next) {
  res.status(500).json({ code: res.statusCode, msg: err.message }); //send도 가능, json형식으로도 가능
});

app.get(
  //경로명
  "/example",
  //첫 콜백함수
  (req, res, next) => {
    // let a;
    // console.log(a / 5);
    throw new Error("에러발생");
    console.log("첫번째 콜백");
    next();
  },
  //마지막 콜백함수
  (req, res) => {
    res.send("두번째 콜백");
  }
);

//클라우이언트에서 HTTP 요청 메소드 중 GET을 이용해서 'host:port'로 요청을 보내면 실행되는 라우트
app.get("/", (req, res) => {
  res.send("hello world!~~~~");
});

//정규표현식 사용 가능
//예시)b가 없거나 b가 있거나 => /ab?cd/
app.get("/ab[0-9]cd", (req, res) => {
  res.send("정규표현식");
});

//app.listen() 함수를 사용하여 서버를 실행
app.listen(port, () => {
  console.log(`server runing http://localhost:${port}`);
});
