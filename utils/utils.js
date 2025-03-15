const sendResponse = (res, status, statusCode, message, error = null, data = null) => {
  if (data !== null) {
    return res.status(statusCode).json({
      status: status,
      message: message,
      data: data,
    });
  } else if (error !== null) {
    return res.status(statusCode).json({
      status: status,
      message: message,
      error: error.message,
    });
  }
};

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) token = req.cookies.jwt;
//   return token;
// };

module.exports = { sendResponse };
