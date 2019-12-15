const config = require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 9998,
  SSL_PORT: process.env.SSL_PORT || 9999,
  pkey: process.env.PKEY || "./cert_and_key/defaultprivatekey.crt",
  sslcert: process.env.SSLCERT || "./cert_and_key/defaultcertificate.crt"
};
