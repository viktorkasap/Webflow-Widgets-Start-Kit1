import { AxiosError } from 'axios';

export enum Method {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch',
}

export interface ServerError {
  code?: string;
  error?: string;
  message?: string;
  status?: number;
}

export interface ApiRequestOptions<D> {
  data?: D;
  params?: D;
  url?: string;
  debug?: boolean;
  method?: Method;
  withThrow?: boolean;
}

export type ApiError = AxiosError<ServerError> | Error;

export type ResponseError = string | number;
