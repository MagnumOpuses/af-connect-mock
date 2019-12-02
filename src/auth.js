const credentials = require("./dataset-mock");

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = credentials.find(
      credential =>
        credential.username === username && credential.password === password
    );
    if (user !== undefined) {
      resolve({ status: 200, message: user });
    } else {
      resolve({ status: 401, message: "Invalid login" });
    }
  });
};

module.exports = { login };
