import { NextFunction, Request, Response } from "express";

import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";
import { connectToDatabase } from "../../data-source";
import { getPathKeys, getBodyKeys } from "../../shared/getKeys";
import { TUpdatePathParamters, IUpdateCompany } from "./@types/eventInput";
import { entityMapping } from "../../shared/entityMapping";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const pathParamters: TUpdatePathParamters = (await getPathKeys(
    req
  )) as TUpdatePathParamters;
  const body: IUpdateCompany = await getBodyKeys(req);

  if (!pathParamters.id) {
    return badRequestResponse("id must be sent", res);
  }

  if (!body) {
    return badRequestResponse("body must be sent", res);
  }

  try {
    const { where, id } = pathParamters;
    if (!(where in entityMapping)) return errorResponse("unknown route", res);

    const connection = await connectToDatabase();
    const startConnection = await connection.initialize();
    const entity = entityMapping[where];
    const dataRepository = startConnection.getRepository(entity);

    const company: IUpdateCompany = await dataRepository.findOne({
      where: { id: id },
    });

    if (!company) {
      await connection.destroy();
      return errorResponse("company not found", res);
    }

    const updateResult = await dataRepository.update(id, { ...body });

    if (!updateResult.affected) {
      await connection.destroy();
      return errorResponse("company not by updated", res);
    }
    await connection.destroy();
    return successResponse("company successfully updated", {}, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
