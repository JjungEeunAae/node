//evpress를 .route를 이용하여 좀 더 간결하게 사용해보자
import { Router } from "express";
const route = Router();

route
  .get("/", (req, res) => {
    //. ?writer=kim
    console.log("writer: ", req.query.writer);
    console.log("wdt: ", req.query.wdt);
    res.send("board get");
  })
  .post("/", (req, res) => {
    console.log("title: ", req.body.title);
    res.send("board post");
  })
  .put("/", (req, res) => {
    res.send("board put");
  })
  .delete("/:boardno", (req, res) => {
    console.log("boardno: ", req.params.boardno);
    res.send("board delete");
  });

export default route;
