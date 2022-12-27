/*fssync.js*/
//!동기식 = 블록킹 함수
const fs = require("fs"); //html <script src=".js"와 같은 동작
const data = fs.readFileSync("./template/text.txt", "utf8"); //선언 let을 해도 상관없음
console.log(data);
