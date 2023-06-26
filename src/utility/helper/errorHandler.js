const errorHandler = (err) => {
  let error = "";
  const customError = err?.response?.data?.message;
  const serverError = err?.response?.data?.errors?.message;
  const networkError = err?.toString();
  if (customError) error = customError;
  else if (serverError) error = serverError;
  else if (networkError) error = networkError;
  else error = "Oops! Something went wrong.";
  if (error === "Unauthorized") error = "Session Time out!";
  if (
    error === "Cancel: Requests cancelled!"
    || error === "Error: Request failed with status code 400"
  ) {
    return;
  }
  return error;
};
export default errorHandler;
