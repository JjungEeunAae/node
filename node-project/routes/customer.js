import { Router } from "express";
const route = Router();

route
  .get("/", (req, res) => {
    res.send("get customer");
  })
  .post("/", (req, res) => {
    res.send("post customer");
  });

export default route;
