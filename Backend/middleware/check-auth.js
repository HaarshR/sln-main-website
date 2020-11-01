const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JTW_KEY);
    req.userData = {
      loggedIn: decodedToken.loggedIn,
      adminID: decodedToken.firstNadminIDame,
      adminEMAIL: decodedToken.adminEMAIL,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
