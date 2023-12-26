const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const MongoStore = require("connect-mongo");

var app = express();

const dbString = process.env.mongoDBURL;
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// const connection = mongoose.createConnection(dbString, dbOptions);

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
  res.send("<h1>Hello World</h1>");
});

app.listen(8080);
