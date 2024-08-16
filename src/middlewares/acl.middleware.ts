import { Request, Response, NextFunction } from "express";
import { IReqUser } from "../helpers/interfaces";

export default (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as IReqUser).user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
