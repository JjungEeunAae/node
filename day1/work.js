/*work.js*/
//웹서버로 요청하기
const http = require("http");
let todoList = [
  { content: "test1", complete: false },
  { content: "test2", complete: true },
  { content: "test3", complete: false },
  { content: "test4", complete: false },
];

/*
/todo?[Key값]=[value값]
Key값을 no라고 지정하고,
value값에 1을 넣는다면
todoList의 배열의 첫번째 항이
출력되도록 js 파일을 완성시켜라
*/

//서버생성
const server = http.createServer((req, res) => {
  const myUrl = new URL("http://127.0.0.1:3000" + req.url);
  //만약 경로이름이 /todolist라면
  if (myUrl.pathname == "/todolist") {
    //요청자의 응답을 끝낼 때 todoList 배열을 JSON형식의 문자열로 변환한다.
    res.end(JSON.stringify(todoList));
    //만약 경로이름이 /todo라면
  } else if (myUrl.pathname == "/todo") {
    //URL의 파라미터 Key값("no")과 그에 대한 value값을 가지고 온다
    //=> /todo?Key=value&Key=value...
    let number = myUrl.searchParams.get("no");
    // ? myUrl.searchParmas -> 그냥 {key : value}
    // ? myUrl.searchParams.get("key값") -> (? 뒤에 있는 no -> 얘가 key) -> no이란 놈의 value를 가지고 옴

    // ! ?no= (얘는 아예 없는 값)
    //만약 Key값의 value값이 없거나 0으로 입력했을 때
    if (!number || number == "0") {
      // res -> response, req -> request
      //  요청자의 응답을 "No parameter"로 응답하고 종료
      res.end("No parameter");
    } else {
      /* 
       ! value(no라는 key)값이 todoList의 길이보다 값 초과하는 경우 
       ? No Data라고 표시하고응답종료
      */
      if (number > todoList.length) {
        res.end(JSON.stringify("No Data"));
      }

      /*위의 조건이 실행되지 않았을 때,
        todoList 배열의 길이만큼 반복한다*/
      for (let i = 0; i < todoList.length; i++) {
        //만약 value값이 i+1이면
        if (number == i + 1) {
          //요청자의 응답을 끝낼 때 입력한 todoList 배열의 순서에 맞게 JSON형식의 문자열로 안내한다.
          res.end(JSON.stringify(todoList[i]));
        }
      }
    }
  }
});

server.listen(3000, () => {
  console.log("server running http://127.0.0.1:3000");
});
