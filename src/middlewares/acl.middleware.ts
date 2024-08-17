import { Request, Response, NextFunction } from "express";
import { IReqUser } from "../helpers/interfaces";
import { failedResponse, HTTP_RESPONSE_CODE } from "../helpers/response";

export default (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as IReqUser).user.role;

    if (!roles.includes(userRole)) {
      return failedResponse({
        res,
        data: null,
        message: "Forbidden",
        status: HTTP_RESPONSE_CODE.NOT_AUTHORIZED,
      });
    }

    next();
  };
