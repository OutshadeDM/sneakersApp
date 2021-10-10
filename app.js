require('dotenv').config();
const express       = require("express"),
      sneakerRouter = require("./api/sneaker/routes"),
      app           = express();

const { APP_PORT } = process.env;

app.use(express.json({ parameterLimit: 500000, limit: "50mb" })); // support json encoded bodies
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 })); // support encoded bodies

app.use(function (req, res, next) {
  res.set("credentials", "include");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Origin", req.headers.origin);
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
});

app.use('/', sneakerRouter);

app.get('*', (req, res) => {
	res.send(`<h1>This is a REST api for sneakers!</h1>`);
});

app.listen(APP_PORT, () => {
  console.log("🚀 SERVER UP AND RUNNING ON PORT:", APP_PORT);
});

module.exports = app;
