import { Request, Response } from "express";
import { toDataURI } from "../helpers/encode";
import {
  getPublicIdFromFileUrl,
  handleRemove,
  handleUpload,
} from "../helpers/cloudinary";
import {
  failedResponse,
  HTTP_RESPONSE_CODE,
  okResponse,
} from "../helpers/response";

export default {
  async single(req: Request, res: Response) {
    if (req?.file === undefined) {
      return failedResponse({
        res,
        data: null,
        message: "No file uploaded",
        status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
      });
    }
    const dataURI = toDataURI(req.file);

    try {
      const result = await handleUpload(dataURI);
      return okResponse({
        res,
        data: result,
        message: "File uploaded",
      });
    } catch (error) {
      const err = error as Error;
      return failedResponse({
        res,
        data: err.message,
        message: "Error uploading file",
        status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
      });
    }
  },
  async multiple(req: Request, res: Response) {
    if (req.files === undefined || req.files?.length === 0) {
      return failedResponse({
        res,
        data: null,
        message: "No files uploaded",
        status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
      });
    }
    const files = req.files as Express.Multer.File[];

    const dataURIs = files
      ?.map((file: Express.Multer.File) => toDataURI(file))
      .map(handleUpload);

    try {
      const results = await Promise.all(dataURIs);
      return okResponse({
        res,
        data: results,
        message: "File uploaded",
      });
    } catch (error) {
      const err = error as Error;
      return failedResponse({
        res,
        data: err.message,
        message: "Error uploading file",
        status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
      });
    }
  },
  async remove(req: Request, res: Response) {
    const { fileUrl } = req.body as unknown as { fileUrl: string };

    try {
      const publicId = getPublicIdFromFileUrl(fileUrl);
      const result = await handleRemove(publicId);

      return okResponse({
        res,
        data: result,
        message: "Success remove file",
      });
    } catch (error) {
      const err = error as unknown as Error;
      return failedResponse({
        res,
        data: err.message,
        message: "Failed remove file",
        status: HTTP_RESPONSE_CODE.WRONG_CLIENT,
      });
    }
  },
};
