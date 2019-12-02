const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const config = require("./config");

const auth = require("./auth");

const credentials = require("./dataset-mock");

app.set("views", __dirname + "/../views");
app.set("view engine", "ejs");
app.engine("html", ejs.__express);

app.use(bodyParser.text({ type: "application/json" }));

app.use("/css", express.static(__dirname + "/../public/css"));
app.use("/js", express.static(__dirname + "/../public/js"));

app.get("/AuthenticationDispatcher/Dispatch", (req, res, next) => {
  res.render("pages/login");
});

app.post("/AuthenticationDispatcher/Dispatch", (req, res, next) => {
  const json = JSON.parse(req.body);

  return new Promise((resolve, reject) => {
    const user = credentials.find(
      credential =>
        credential.username === json.username &&
        credential.password === json.password
    );
    if (user !== undefined) {
      resolve({ status: 200, message: user });
    } else {
      resolve({ status: 401, message: "Invalid login" });
    }
  })
    .then(result => {
      if (!result || !result.status || !result.message) {
        throw ("Unknown response status from auth, result: ", result);
      } else {
        res.status(result.status).json(result.message);
      }
    })
    .catch(err => {
      console.log("Unexpected failure: ", err);
      res.status(500).send("Unexpected failure: ", err);
      return;
    });
});

app.get("/jwt/rest/idp/v0/klientID", (req, res, next) => {
  // Get the value of header 'AMV_SSO_COOKIE' and find it in the credentials.
  // Return the following json object in response.
  // { token: "cookie value" }
  res.json({ token: "abc" });
});

app.get("/envelop", (req, res, next) => {
  // Use header: 'X-JWT-Assertion' with value jwt token
  // Provide a body with the following data:
  // { status: 200, body: {envelope} }
  res.send("Envelop page");
});

app.listen(config.PORT, () => {
  console.log(`Server running HTTP on port ${config.PORT}`);
});
