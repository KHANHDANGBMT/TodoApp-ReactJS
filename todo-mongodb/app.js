const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./todo.database");
const mongoose = require("mongoose");
var argv = require("minimist")(process.argv.slice(2));
var bodyParser = require("body-parser");
const {todoRoutes} = require("./src/routes");
var cors = require("cors");


mongoose.Promise = global.Promise;
mongoose
  .connect(db.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB is connected...");
  })
  .catch((err) => {
    console.log("ERR: ", err);
  });
const app = express();

//config swagger after initial app
var subpath = express();
app.use(bodyParser());
app.use("/v1", subpath);
// cors
app.use(cors());

var swagger = require("swagger-node-express").createNew(subpath);
app.use(express.static("dist"));
swagger.setApiInfo({
  title: "API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "khanhdang@gmail.com",
  license: "",
  licenseUrl: "",
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
swagger.configureSwaggerPaths("", "api-docs", "");
// Configure the API domain
var domain = "localhost";
if (argv.domain !== undefined) domain = argv.domain;
else
  console.log(
    'No --domain=xxx specified, taking default hostname "localhost".'
  );

// Configure the API port
var port = 3123;
if (argv.port !== undefined) port = argv.port;
else console.log("No --port=xxx specified, taking default port " + port + ".");

// Set and display the application URL
var applicationUrl = "http://" + domain + ":" + port;
console.log("snapJob API running on " + applicationUrl);

swagger.configure(applicationUrl, "1.0.0");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("port", process.env.PORT);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// set route for todo
app.use("/todo-list", todoRoutes);

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
app.set("port", 3123);
app.listen(app.get("port") || 3123, function () {
  console.log("Server is running on port: http://localhost:" + app.get("port"));
});
// app.listen(process.env.PORT || 3123);
