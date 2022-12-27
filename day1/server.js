const http = require("http");
//http 서버생성
let infoarr = [];
infoarr["kim"] = { name: "김유신", hobby: "게임" };
infoarr["park"] = { name: "박기자", hobby: "독서" };

const server = http.createServer((req, res) => {
  //function callback 함수 화살표로 표현
  //req : 요청 상세정보( 요청 헤더와 요청 data )
  //res : 클라이언트(호출자)에게 데이터를 반환 ( 상태코드, contentType, 응답 데이터)

  //URL 형성(생성)
  const myurl = new URL("http://127.0.0.1:3000" + req.url);
  console.log(myurl.pathname);
  console.log(myurl.searchParams);
  if (myurl.pathname == "/") {
    res.end("main");
  } else if (myurl.pathname == "/info") {
    // res.setHeader("content-type", "text/html"); //
    let userid = myurl.searchParams.get("userid");
    res.end(info(userid));
  } else if (myurl.pathname == "/boardReg") {
    res.write(boardReg());
    res.end();
  } else if (myurl.pathname == "/userReg") {
    res.write(userReg());
    res.end();
  } else if (myurl.pathname == "/boardRegAction") {
    let title = myurl.searchParams.get("title");
    let content = myurl.searchParams.get("content");
    console.log("title", title);
    console.log("content", content);
    res.end("등록완료");
  } else {
    //응답상태정보 404=>요청받은 페이지가 존재하지않음.
    res.statusCode = 404; //지정하지않으면 기본 200으로 됨
    res.end();
  }
  // res.write("hello"); //document에 표기할 수 있는 방법
  // res.end();
});

server.listen(3000, () => {
  //해당 (3000(포트))로 서버를 구축
  console.log("server is running http://127.0.0.1:3000");
});

function info(userid) {
  if (!userid || !infoarr[userid]) {
    return "no user";
  }
  let html = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>샘플</title>
    </head>
    <body>
      <h3>my info</h3>
      <div>id: ${userid ? userid : ""}</div>
      <div>이름: ${infoarr[userid].name}</div>
      <div>취미: ${infoarr[userid].hobby}</div>
    </body>
  </html>`;
  return html;
}

function boardReg() {
  // res.setHeader("content-type", "text/html");
  let html2 = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h3>게시글 작성 몇번이나 고치는거죠</h3>
      <form action="boardRegAction">
        <div><input type="text" name="title" /></div>
        <div><textarea name="content" id="" cols="30" rows="10"></textarea></div>
        <div><button>등록</button></div>
      </form>
    </body>
  </html>`;
  return html2;
}

function userReg() {
  // res.setHeader("content-type", "text/html");
  let html3 = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h3>샘플</h3>
      <form action="userRegAction">
        <div>
          <input type="text" name="userid" placeholder="ID" />
        </div>
        <div>
          <input type="text" name="username" placeholder="이름" />
        </div>
        <div>
          <input type="password" name="userPassword" placeholder="비밀번호" />
        </div>
        <div>
          <input type="text" name="userHp" placeholder="전화번호" />
        </div>
        <button>회원가입</button>
      </form>
    </body>
  </html>`;
  return html3;
}
