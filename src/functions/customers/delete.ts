import { NextFunction, Request, Response } from "express";

import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";

import { connectToDatabase } from "../../data-source";
import { Customer } from "../../entity/Customer";
import { getBodyKeys } from "../../shared/getKeys";
import { ICreateCustomer } from "./@types/eventInput";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const body: ICreateCustomer = await getBodyKeys(req);

  if (!body) {
    return badRequestResponse("body must be sent", res);
  }
  try {
    const connection = await connectToDatabase();
    const startConnection = await connection.initialize();
    const dataRepository = startConnection.getRepository(Customer);
    delete body.companysNew;
    const customer = await dataRepository.findOne({
      where: { id: body.id },
      relations: ["companys"],
    });

    if (!customer) {
      return errorResponse("customer notfound", res);
    }

    if (customer.email !== body.email) {
      return errorResponse("customer name is invalid", res);
    }

    const deleted = await dataRepository.remove(customer);
    await connection.destroy();
    return successResponse("customer deleted successfully", deleted, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
