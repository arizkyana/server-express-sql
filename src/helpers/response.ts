import { Response } from "express";

export enum HTTP_RESPONSE_CODE {
  SUCCESS = 200,
  SUCCESS_SUBMIT = 201,
  NOT_FOUND = 404,
  WRONG_CLIENT = 400,
  NOT_AUTHORIZED = 403,
  SERVER_ERROR = 500,
}

interface IOkResponseParam<T> {
  res: Response;
  data: T;
  message: string;
  status?: HTTP_RESPONSE_CODE;
}

export type TResponse<T> = {
  meta: {
    status: HTTP_RESPONSE_CODE;
    message: string;
  };
  data: T;
};

export function okResponse<T>({
  res,
  data,
  message,
  status = HTTP_RESPONSE_CODE.SUCCESS,
}: IOkResponseParam<T>) {
  return res.status(status).json({
    meta: {
      status,
      message,
    },
    data,
  } as TResponse<T>);
}

export function failedResponse<T>({
  res,
  data,
  message,
  status = HTTP_RESPONSE_CODE.WRONG_CLIENT,
}: IOkResponseParam<T>) {
  return res.status(status).json({
    meta: {
      status,
      message,
    },
    data,
  } as TResponse<T>);
}
