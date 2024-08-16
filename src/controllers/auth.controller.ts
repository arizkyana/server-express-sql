import { Request, Response } from "express";

import { ILogin, IRegister, login, register } from "../services/auth.service";
import { failedResponse, okResponse } from "../helpers/response";

export default {
  async login(req: Request, res: Response) {
    try {
      const result = await login(req.body as ILogin);
      return okResponse({
        res,
        data: result,
        message: "Login success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: err.message,
        message: "Login failed",
      });
    }
  },
  async register(req: Request, res: Response) {
    try {
      const result = await register(req.body as IRegister);
      return okResponse({
        res,
        data: result,
        message: "Register success",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: err.message,
        message: "Register failed",
      });
    }
  },
};
