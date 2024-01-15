const jwt = require("jsonwebtoken");
const env = require("dotenv");

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies.cookieAuth;
    if (!cookie) return res.status(401).json("Not Logged In.");
    decodedCookie = jwt.verify(cookie, process.env.JWT_SECRET_KEY);

    req.userData = {
      userName: decodedCookie.name,
      userId: decodedCookie.userId,
    };

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("Unauthenticated...");
  }
};
