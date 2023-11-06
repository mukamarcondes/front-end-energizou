import { NextFunction, Request, Response } from "express";

import { errorResponse, successResponse } from "../shared/responses";
import { connectToDatabase } from "../data-source";
import { getPathKeys } from "../shared/getKeys";
import { entityMapping, entityRelations } from "../shared/entityMapping";
import { processDataToSpTime } from "../shared/processData";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const pathParamters = await getPathKeys(req);
  const requestColumn = req.header("X-Request-Column");
  try {
    const connection = await connectToDatabase();
    const startConnection = await connection.initialize();

    const { where, form, id } = pathParamters;

    console.log("request", where, form, id);

    if (form !== "all" && id === "0") {
      await connection.destroy();
      return errorResponse(
        "Invalid value: 'id' cannot be equal to 0 in Path Paramters when 'form' is not 'all'",
        res
      );
    }

    if (!(where in entityMapping)) return errorResponse("unknown route", res);

    const allowedFormsCustomer = ["all", "id"];
    if (where === "customer" && !allowedFormsCustomer.includes(form)) {
      await connection.destroy();
      return errorResponse(
        "this parameter is not a valid to customer, only for the company",
        res
      );
    }

    const entity = entityMapping[where];
    const entityRelation = entityRelations[where];
    const dataRepository = startConnection.getRepository(entity);

    const params = {
      all: async () =>
        await dataRepository
          .find({
            order: { id: "ASC" },
            relations: Array.isArray(entityRelation) ? entityRelation : [],
          })
          .then((data) => {
            let newData = [];
            for (const item of data) {
              const database = item;
              database.createdAt = processDataToSpTime(database.createdAt);
              database.updatedAt = processDataToSpTime(database.updatedAt);

              if (requestColumn !== undefined) {
                newData.push({ [database.id]: database[requestColumn] });
              } else {
                if (where === "customer") {
                  database.companys = database.companys[0];
                }
                newData.push(database);
              }
            }
            return newData;
          }),
      id: async () =>
        await dataRepository
          .findOne({
            where: { id: id },
            relations: Array.isArray(entityRelation) ? entityRelation : [],
          })
          .then((data) => {
            data.createdAt = processDataToSpTime(data.createdAt);
            data.updatedAt = processDataToSpTime(data.updatedAt);
            return data;
          }),
      cep: async () =>
        await dataRepository
          .findOne({
            where: { cep: id },
            relations: Array.isArray(entityRelation) ? entityRelation : [],
          })
          .then((data) => {
            data.createdAt = processDataToSpTime(data.createdAt);
            data.updatedAt = processDataToSpTime(data.updatedAt);
            return data;
          }),
      cnpj: async () =>
        await dataRepository
          .findOne({
            where: { cnpj: id },
            relations: Array.isArray(entityRelation) ? entityRelation : [],
          })
          .then((data) => {
            data.createdAt = processDataToSpTime(data.createdAt);
            data.updatedAt = processDataToSpTime(data.updatedAt);
            return data;
          }),
    };

    if (!params[form]) {
      await connection.destroy();
      return errorResponse("unknown route param", res);
    }
    const response = await params[form]();

    if (!response) {
      await connection.destroy();
      return errorResponse(`${where} not found`, res);
    }
    await connection.destroy();
    return successResponse(`${where} successfully recovered`, response, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
