import axios from 'axios';

import { log } from '@shared/lib';

import { throwFormattedError } from './throw-formatted-error';
import { ApiError, ApiRequestOptions, Method } from './types';

/**
 * Makes an API request using predefined configurations.
 *
 * @param debug
 * @param withThrow
 * @param props - The options for the API request.
 * @returns Returns the response data from the API.
 * @throws Will throw an error if the API request fails.
 */

export const apiRequest = async <D>({ debug = false, withThrow = false, ...props }: ApiRequestOptions<D>) => {
  try {
    const { method = Method.Post, ...options } = props;
    const response = await axios({ method, ...options });

    if (debug) {
      log('Request response:', response);
    }

    return response.data;
  } catch (err) {
    if (debug) {
      console.error('Request error:', err);
    }

    throwFormattedError(err as ApiError, withThrow);
  }
};
