import { isAxiosError } from "axios";

export const axiosErrorCatch = (
  error: unknown
): {
  message: string;
  field?: string;
  errors?: string[];
} => {
  const res = {
    message: "",
    field: undefined,
    errors: undefined,
  };
  if (isAxiosError(error)) {
    // If the error is an Axios error
    if (error.response) {
      res.message =
        error.response.data.message ||
        "Some unknown error occurred, please try again later!";
      res.field = error.response.data.field;
      res.errors = error.response.data.errors;
    } else if (error.request) {
      res.message =
        "No response received from the server. Please try again later.";
      return res;
    } else res.message = `Error in request setup: ${error.message}`;
  } else if (error instanceof Error) {
    res.message = error.message;
  } else res.message = "An unknown error occurred.";

  return res;
};
