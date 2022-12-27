// ? http.js(모듈)의 http 객체를 쓰겠다(참조)
const http = require("http");
const fs = require("fs");

// ? 서버를 선언했음(클라이언트 요청이 들어왔을 때 호출될 핸들러(동작))
const server = http.createServer((req, res) => {
  const myurl = new URL("http://localhost:3000" + req.url);
  console.log("pathname: ", myurl.pathname);
  console.log("searchParams: ", myurl.searchParams);
  //!응답을 여기서 종료하면 밑에 부분이 진행이 안되며 에러가 뜸
  //?에러내용 -> Error [ERR_STREAM_WRITE_AFTER_END]: write after end
  // res.end("hello");
  if (myurl.pathname.startsWith("/page")) {
    const pagename = "./template" + myurl.pathname.substring(5) + ".html";
    //파일을 다 읽고나면  뒤에 있는 핸들러가 동작된다
    //에러났으면 에러 메세지 띄우고, 그게 아니면 데이터를 표시한다
    fs.readFile(pagename, "utf8", (err, data) => {
      res.end(data);
    });
  } else {
    res.end("no path");
  }
});

// ? 서버 동작할 수 있는 포트 생성
server.listen(3000, () => {
  //접속시 로그를 동작에 대한 내용 안내하기
  console.log("server running http://localhost:3000");
});
