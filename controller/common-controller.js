const sendError = (res, errorResInfo) => (error) => {
  res.status(501).json({
    ...errorResInfo,
    message: "Error occurred!",
    error: error.toString(),
  });
};
module.exports = {
  sendError,
};
