import { AxiosError } from 'axios';

import { ErrorResponse } from './types';

export function getErrorCodeMessage(e: unknown) {
  if (e instanceof AxiosError === false) {
    return 'unknown error';
  }

  const data = e?.response?.data as ErrorResponse;

  if (!data) {
    return e.message;
  }

  if (data.isUnknownError) {
    return `[${data.errorCode}] ${data.clientErrorMessage}`;
  } else {
    return `${data.clientErrorMessage}`;
  }
}
