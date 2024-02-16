const sendError = (res, errorResInfo) => (error) => {
  res.status(404).json({
    ...errorResInfo,
    error_description: error.message || "Error Occurred!",
  });
};
module.exports = {
  sendError,
};
