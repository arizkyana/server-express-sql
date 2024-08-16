import { Request, Response, NextFunction } from "express";
import { failedResponse, HTTP_RESPONSE_CODE } from "../helpers/response";

export const errorNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return failedResponse({
    res,
    data: null,
    message: "Not Found",
  });
  // return res.status(404).json({ data: null, message: "Not found" });
};

export const errorServerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return failedResponse({
    res,
    data: null,
    message: err.message,
    status: HTTP_RESPONSE_CODE.SERVER_ERROR,
  });
  // return res.status(500).json({ data: null, message: err.message });
};
