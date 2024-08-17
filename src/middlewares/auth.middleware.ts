import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../helpers/env";
import { IReqUser } from "../helpers/interfaces";
import { failedResponse, HTTP_RESPONSE_CODE } from "../helpers/response";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return failedResponse({
      res,
      data: null,
      message: "Unauthorized",
      status: HTTP_RESPONSE_CODE.NOT_AUTHORIZED,
    });
  }

  const [prefix, accessToken] = token.split(" ");

  if (prefix !== "Bearer" || !accessToken) {
    return failedResponse({
      res,
      data: null,
      message: "Unauthorized",
      status: HTTP_RESPONSE_CODE.NOT_AUTHORIZED,
    });
  }

  const user = jwt.verify(accessToken, `${SECRET}`) as unknown as {
    id: string;
    role: string;
  };

  if (!user) {
    return failedResponse({
      res,
      data: null,
      message: "Unauthorized",
      status: HTTP_RESPONSE_CODE.NOT_AUTHORIZED,
    });
  }

  (req as IReqUser).user = {
    id: user.id,
    role: user.role,
  };

  next();
};
