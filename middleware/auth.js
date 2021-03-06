const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.get("privatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
      res.status(400).send('Invalid token');
  }
}
exports.auth = auth;
