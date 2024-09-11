import { Request, Response } from "express";
import {
  create,
  findAll,
  findOne,
  IPaginationQuery,
  remove,
  update,
} from "../services/bundle.service";
import { Bundle } from "../entity/Bundle";
import { IReqUser } from "../helpers/interfaces";
import { User } from "../entity/User";
import {
  failedResponse,
  HTTP_RESPONSE_CODE,
  okResponse,
} from "../helpers/response";

export default {
  async findAll(req: Request, res: Response) {
    try {
      const results = await findAll(req.query as unknown as IPaginationQuery);

      if (!results) {
        return failedResponse({
          res,
          data: null,
          message: "Section not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: results,
        message: "Success fetch courses!",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: null,
        message: err.message,
      });
    }
  },
  async create(req: IReqUser, res: Response) {
    try {
      const bundle = req.body.bundle as Bundle;
      const course = req.body.course as number;
      const result = await create(bundle, course, req.user as User);
      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Section not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success create course!",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: null,
        message: err.message,
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await findOne(id as unknown as number);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Section not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Course get product!",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: null,
        message: err.message,
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bundle = req.body.bundle as Bundle;
      const course = req.body.course as number;
      const result = await update(Number(id), bundle, course);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Section not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success update course!",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: null,
        message: err.message,
      });
    }
  },
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await remove(id as unknown as number);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Section not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Succes remove course",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: null,
        message: err.message,
      });
    }
  },
};
