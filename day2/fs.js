/*fs.js*/
// ! 비동기 = non-blocking 함수 => 콜백함수이용
const fs = require("fs");
fs.readFile("./template/text.txt", "utf8", (err, data) => console.log(data));
console.log("the end");
