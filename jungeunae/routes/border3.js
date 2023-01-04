//! 웹서버에서 동작하고자하는 컨트롤러를 실행
var express = require("express");
const pool = require("../mysql/pool");
var router = express.Router();

//! 네이버 통합검색어 API
var client_id = "wjddmsdo77";
var client_secret = "dmsdowwkd1";
var api_url = "https://openapi.naver.com/v1/datalab/search";
var request_body = {
  startDate: "2017-01-01",
  endDate: "2017-04-30",
  timeUnit: "month",
  keywordGroups: [
    {
      groupName: "한글",
      keywords: ["한글", "korean"],
    },
    {
      groupName: "영어",
      keywords: ["영어", "english"],
    },
  ],
  device: "pc",
  ages: ["1", "2"],
  gender: "f",
};

router.get("/", (req, res) => {
  res.render("border3", {
    islogin: req.session.islogin,
    userid: req.session.userid,
  });
});

router.post(
  {
    url: api_url,
    body: JSON.stringify(request_body),
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
      "Content-Type": "application/json",
    },
  },
  function (error, response, body) {
    console.log(response.statusCode);
    console.log(body);
  }
);

module.exports = router;
