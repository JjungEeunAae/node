/** @format */

//const cookieParser = require("cookie-parser");
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

loginsql = {
    select: "select * from jungeunae", //조회
    selectOne: "select * from jungeunae where userid = ?", //단건조회
    insert: "insert into jungeunae set ?", //등록
    view: "UPDATE jungeunae SET views = views + 1 WHERE no = ?", //조회수증가
    update: "update jungeunae set ? where no = ?", //수정
    delete: "delete from jungeunae where no = ?", //삭제
};

/* GET users listing. */
router.get("/", function (req, res, next) {
    req.session.destroy();
    res.send("respond with a resource");
});

//!로그인 정보 가져오기
router.get("/", (req, res) => {
    pool.query(loginsql.select, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

//!단건조회 / 로그인 후 전체게시판으로 이동
router.post("/login", (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    pool.query(loginsql.selectOne, userid, (err, result) => {
        if (result.length == 0) {
            console.log("loing failure!!");
            res.redirect("/login.html");
            return;
        }
        //일치한 정보가 있으면 다음 페이지로 넘어가고
        if (result[0].userpw == userpw) {
            //DB에 있는 로그인 정보가 html form에 있는 name과 같을 때,
            console.log(req.session);
            req.session.islogin = true; //session에 로그인여부 값을 넣어준다
            req.session.userid = userid; //session에 아이디 값을 넣어준다
            //redirect 메서드는 파라미터에 해당되는 URL로 이동시켜준다
            res.redirect("/border");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login.html");
});

module.exports = router;
