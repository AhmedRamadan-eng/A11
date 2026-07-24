
export const ErrorResponse = (message, status = 500, extra) => {

  const error = new Error(message);

  error.status = status;
  error.extra = extra;

  return error;
};