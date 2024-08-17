import { Request, Response } from "express";
import {
  failedResponse,
  HTTP_RESPONSE_CODE,
  okResponse,
} from "../helpers/response";
import {
  findAll,
  create,
  findById,
  findBySlug,
  update,
  remove,
  IPaginationQuery,
} from "../services/product.service";
import { Product } from "../entity/Product";

export default {
  async findAll(req: Request, res: Response) {
    try {
      const results = await findAll(req.query as unknown as IPaginationQuery);

      if (!results) {
        return failedResponse({
          res,
          data: null,
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: results,
        message: "Success fetch products!",
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
  async create(req: Request, res: Response) {
    try {
      const result = await create(req.body as Product);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success create product!",
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
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await findById(id as unknown as number);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success get product!",
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
  async findBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const result = await findBySlug(slug as unknown as string);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success get product by slug!",
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
      const result = await update(id as unknown as number, req.body as Product);

      if (!result) {
        return failedResponse({
          res,
          data: null,
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Success update product!",
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
          message: "Product not found",
          status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
        });
      }

      return okResponse({
        res,
        data: result,
        message: "Succes remove product",
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
