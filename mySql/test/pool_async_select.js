const mysql = require("./pool_async");

sql1 = "SELECT * FROM customers";
sql2 = "SELECT * FROM freeboard";

//mysql.query(sql1).then((result) => console.log(result));
//resolve => then -> 성공했을 때
//reject => cach -> 실패 했을 때

async function get() {
  let result1 = await mysql.query(sql1);
  let result2 = await mysql.query(sql2, result1[0].id);
  console.log({ cust: result1, board: result2 });
}

get();
console.log("end");
