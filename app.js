const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const MongoStore = require("connect-mongo");

var app = express();

const dbString = process.env.mongoDBURL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbString, collection: "sessions" }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // equals 1 day (1day * 24hr/day * 60min/hr * 60sec/min * 1000ms/sec)
    },
  })
);

app.get("/", (req, res, next) => {
  //   console.log(req.session);
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times!</h1>`
  );
});

app.listen(8080);
