const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
  } catch (er) {
    return next(new AppError(400, "Not authorized"));
  }
  next();
};

module.exports = verifyTokenSocket;
