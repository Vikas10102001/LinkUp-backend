const errorController = (er, req, res, next) => {
  er.statusCode = er.statusCode || 500;
  er.status = er.status || "error";
  res.status(er.statusCode).json({
    status: er.status,
    error: er.message,
    stack: er.stack,
  });
};

module.exports = errorController;
