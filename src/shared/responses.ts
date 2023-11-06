import { Response } from "express";
export const STATUS_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  ERROR: 500,
};

export const errorValidator = (error: any, res: Response) => {
  const body = { statusCode: STATUS_CODE.ERROR, message: error.message };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.ERROR).json(body);
};

// 401
export const unauthorizedResponse = (message: string, res: Response) => {
  const body = {
    statusCode: STATUS_CODE.UNAUTHORIZED,
    message,
  };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.UNAUTHORIZED).json(body);
};

// 500
export const errorResponse = (message: any, res: Response) => {
  const body = {
    statusCode: STATUS_CODE.ERROR,
    message,
  };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.ERROR).json(body);
  // return body;
};

// 400
export const badRequestResponse = (message: string, res: Response) => {
  const body = {
    statusCode: STATUS_CODE.BAD_REQUEST,
    message,
  };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.BAD_REQUEST).json(body);
  // return body;
};

export const notFoundRequestResponse = (message: string, res: Response) => {
  const body = {
    statusCode: STATUS_CODE.NOT_FOUND,
    message,
  };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.NOT_FOUND).json(body);
};

// 200
export const successResponse = async (
  message: string,
  data: {},
  res: Response
) => {
  const body = {
    statusCode: STATUS_CODE.SUCCESS,
    message,
    data,
  };
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.SUCCESS).json(body);
};

export const successResponseBase64 = async (
  data = {},
  type: string,
  res: Response
) => {
  const body = {
    statusCode: STATUS_CODE.SUCCESS,
    data,
  };
  res.set("Content-Type", type);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(STATUS_CODE.SUCCESS).json(body);
};
