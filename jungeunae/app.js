/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const fileStore = require("session-file-store")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var borderRouter = require("./routes/border");
var noticeRouter = require("./routes/notice");
var border3Router = require("./routes/border3");
// var borderLookRouter = require("./routes/borderLook");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true, //빈값이여도 쿠키가 생성된다는 부분
        cookie: {
            httpOnly: true,
            maxAge: 60000, //밀리초
        },
        store: new fileStore(),
    })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/border", borderRouter);
app.use("/notice", noticeRouter);
app.use("/border3", border3Router);
// app.use("/borderLook", borderLookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
