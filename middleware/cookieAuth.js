const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = {
      name: decodedToken.name,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
