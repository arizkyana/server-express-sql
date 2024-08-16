import { Request, Response } from "express";
import { HTTP_RESPONSE_CODE, okResponse } from "../helpers/response";
import { THome, getMessage } from "../services/home.service";

export default {
  async home(req: Request, res: Response) {
    const data = await getMessage();
    okResponse<THome>({
      res,
      data,
      message: "Success fetch data from home",
      status: HTTP_RESPONSE_CODE.SUCCESS,
    });
  },
};
