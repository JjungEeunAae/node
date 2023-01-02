/** @format */

//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

router.get("/", (req, res) => {
    res.render("border3");
});

module.exports = router;
