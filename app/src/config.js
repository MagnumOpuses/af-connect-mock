const config = require("dotenv").config();

module.exports = {
  host: process.env.HOST || "af-connect.local",
  port: process.env.PORT || 9998,
  sslPort: process.env.SSL_PORT || 9999,
  healthPort: process.env.HEALTH_PORT || 9803,
  pkey: process.env.PKEY || "./cert_and_key/defaultprivatekey.crt",
  sslcert: process.env.SSLCERT || "./cert_and_key/defaultcertificate.crt",
  ssoDomain: process.env.SSO_DOMAIN || undefined
};
