import { NextFunction, Request, Response } from "express";

import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";

import { connectToDatabase } from "../../data-source";
import { Company } from "../../entity/Company";
import { getBodyKeys } from "../../shared/getKeys";
import { ICreateCompany } from "./@types/eventInput";
import { validateProperty } from "./shared/validateProperty";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const body: ICreateCompany = await getBodyKeys(req);

  if (!body) {
    return badRequestResponse("body must be sent", res);
  }
  try {
    const connection = await connectToDatabase();
    const startConnection = await connection.initialize();
    const dataRepository = startConnection.getRepository(Company);
    const company = await dataRepository.findOne({
      where: { id: body.id },
    });

    if (!company) {
      await connection.destroy();
      return errorResponse("company notfound", res);
    }

    Object.entries(company).forEach(([key, value]: [string, any]) => {
      const dontInlcuedKye = ["createdAt", "updatedAt"];
      if (!dontInlcuedKye.includes(key)) {
        validateProperty(value, body[key], `${key} is invalid`, res);
      }
    });

    const deleted = await dataRepository.remove(company);
    await connection.destroy();
    return successResponse("company deleted successfully", deleted, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
