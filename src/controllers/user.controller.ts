import { Request, Response } from "express";

import { getUsers } from "../services/user.service";
import { failedResponse, okResponse } from "../helpers/response";
import { User } from "../entity/User";

export default {
  async findAll(req: Request, res: Response) {
    try {
      const data = await getUsers();
      return okResponse<User[]>({
        res,
        data,
        message: "Success fetch users!",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse<{ message: string }>({
        res,
        data: {
          message: err.message,
        },
        message: "Failed fetch users data",
      });
    }
  },
};
