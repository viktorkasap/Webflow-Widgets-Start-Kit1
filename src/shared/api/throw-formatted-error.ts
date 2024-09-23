// throwFormattedError.ts

import axios from 'axios';

import { ApiError } from './types';

/**
 * Formats and throws the provided error.
 * For Axios errors, it extracts and uses the server's error message or status.
 * For other errors, it uses the error's message.
 *
 * @param err - The error object to be formatted and thrown.
 * @param withThrow - If true, will throw errors as an Error object. Otherwise, throws them as strings.
 *
 * @throws { string | Error } The formatted error message or an Error object with the formatted message.
 */
export const throwFormattedError = (err: ApiError, withThrow = false): never => {
  let errorMessage;

  if (axios.isAxiosError(err)) {
    const { response } = err;
    const serverError = response?.data;

    errorMessage = err.response?.status || serverError?.message || err.message || serverError?.code || serverError?.error;
  } else {
    errorMessage = (err as Error).message;
  }

  throw withThrow ? new Error(String(errorMessage)) : errorMessage;
};
