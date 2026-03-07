import { HttpStatusCode } from 'axios';

import { ErrorCode } from './error-code';

export type ListResponse<T> = {
  total: number;
  rows: T[];
};

export type ErrorResponse<T = unknown> = {
  errorCode: ErrorCode;
  statusCode: HttpStatusCode;
  message: string;
  details: T;
};
