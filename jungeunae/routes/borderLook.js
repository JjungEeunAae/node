/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

// borderLook_sql = {
//     select: "select * from boarder_comment", //조회
//     selectOne: "select * from boarder_comment where no = ?", //단건조회
//     insert: "insert into boarder_comment set ?", //등록
//     update: "update boarder_comment set ? where no = ?", //수정
//     delete: "delete from boarder_comment where no = ?", //삭제
// };

// router.get("/", (req, res) => {
//     pool.query(borderLook_sql.select, function (err, results, fields) {
//         if (err) {
//             console.log(err);
//         }
//         res.json(results);
//     });
// });

module.exports = router;
