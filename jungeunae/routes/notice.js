//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

notice_sql = {
  select: "select * from noticeboder", //조회
  selectOne: "select * from noticeboder where no = ?", //단건조회
  insert: "insert into noticeboder set ?", //등록
  update: "update noticeboder set ? where no = ?", //수정
  delete: "delete from noticeboder where no = ?", //삭제
};

//전체조회
router.get("/", (req, res) => {
  pool.query(notice_sql.select, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Result => ${JSON.stringify(result)}`);
    res.render("notice", { list: result });
  });
});

// ! 글 작성 페이지 이동 (/notice url이 생략이 되어 있음)
router.get("/writePage", (req, res) => {
  pool.query(notice_sql.select, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Result => ${JSON.stringify(result)}`);
    res.render("noticeOne", { list: result });
  });
});

// ! 글 작성 후 저장
router.post("/writePage", (req, res) => {
  pool.query(notice_sql.insert, req.body, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// ! 글 클릭하면 단건조회 페이지 이동
router.get("/noticeLook/:no", (req, res) => {
  const no = req.params.no;
  pool.query(notice_sql.selectOne, no, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render("noticeLook", { list: result });
  });
});

module.exports = router;
