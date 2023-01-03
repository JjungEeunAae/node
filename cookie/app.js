//! express 미사용
const http = require("http");

//패키지 다운 받아야 쓸 수 있는 방법
const cookie = require("cookie");

http
  .createServer((req, res) => {
    let cookies;
    if (req.headers.cookie) {
      cookies = cookie.parse(req.headers.cookie);
      console.log(cookies.username);
    }
    console.log(cookies);

    //브라우저 호출할 때마다 쿠키를 넣어주는 방법
    res.writeHeader(200, {
      "Set-Cookie": [
        "cookieName=cookieValue",
        `username=hong; Max-Age=${5 * 60}; HttpOnly; Path=/user`,
      ],
    });
    res.end("hello");
  })
  .listen(3000, () => {
    console.log("server running http://localhost:3000");
  });
