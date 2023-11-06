import { Response } from "express";
import { errorResponse } from "../../../shared/responses";

export const validateProperty = (
  propertyValue: any,
  expectedValue: any,
  errorMessage: string,
  res: Response
) => {
  if (propertyValue !== expectedValue) {
    return errorResponse(errorMessage, res);
  }
};
