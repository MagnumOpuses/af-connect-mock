const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const app = express();
const config = require("./config");

const auth = require("./auth");

const credentials = require("./dataset-mock");
const http = require("http");
const https = require("https");
const logger = require("../lib/logger");

const Health = require("check-connectivity");
health = new Health({
  host: config.host,
  port: config.healthPort,
  debug: true,
  compatibleWith: {
    "af-connect": "^1.0.0-beta",
    "af-portability": "^1.0.0-beta"
  }
}).listen();

const privateKey = fs.existsSync(path.resolve(__dirname, config.pkey))
  ? fs.readFileSync(path.resolve(__dirname, config.pkey), "utf8")
  : config.pkey;
const certificate = fs.existsSync(path.resolve(__dirname, config.sslcert))
  ? fs.readFileSync(path.resolve(__dirname, config.sslcert), "utf8")
  : config.sslcert;
const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  { key: privateKey, cert: certificate },
  app
);

app.set("views", __dirname + "/../views");
app.set("view engine", "ejs");
app.engine("html", ejs.__express);

app.use(bodyParser.text({ type: "application/json" }));

app.use("/css", express.static(__dirname + "/../public/css"));
app.use("/js", express.static(__dirname + "/../public/js"));

app.use(logger);

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
      if (config.ssoDomain !== undefined) {
        result.message.ssoDomain = config.ssoDomain;
      }
      return result;
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
  const sso = getCookie(req.headers.cookie, "AMV_SSO_COOKIE");
  return new Promise((resolve, reject) => {
    const user = credentials.find(credential => credential.sso === sso);
    if (user !== undefined) {
      res.send(user.jwt);
    } else {
      res.status(401).send("Invalid sso cookie");
    }
  });
});

app.get(
  "/arbetssokandeprofil/rest/af/v1/arbetssokandeprofil/arbetssokandeprofiler",
  (req, res, next) => {
    const jwtToken = req.headers["x-jwt-assertion"];
    return new Promise((resolve, reject) => {
      const user = credentials.find(
        credential => credential.jwt.token === jwtToken
      );
      if (user !== undefined) {
        res.send(user.jobSeekerProfile);
      } else {
        res.status(401).send("Invalid sso cookie");
      }
    });
  }
);

app.get(
  "/arbetssokande/rest/af/v1/arbetssokande/externa-personuppgifter",
  (req, res, next) => {
    const jwtToken = req.headers["x-jwt-assertion"];
    return new Promise((resolve, reject) => {
      const user = credentials.find(
        credential => credential.jwt.token === jwtToken
      );
      if (user !== undefined) {
        res.send(user.externalPersonalDetails);
      } else {
        res.status(401).send("Invalid sso cookie");
      }
    });
  }
);

if (config.host === "localhost") {
  httpsServer.listen(config.sslPort, () =>
    console.log(`AF Connect Mock listening on port: ${config.sslPort} !`)
  );
  httpServer.listen(config.port, () =>
    console.log(`AF Connect Mock listening on port: ${config.port} !`)
  );
} else {
  httpsServer.listen(config.sslPort, config.host, () =>
    console.log(`AF Connect Mock listening on port: ${config.sslPort} !`)
  );
  httpServer.listen(config.port, config.host, () =>
    console.log(`AF Connect Mock listening on port: ${config.port} !`)
  );
}

let getCookie = (cookieString, name) => {
  let value = "; " + cookieString;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
};
