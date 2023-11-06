import { NextFunction, Request, Response } from "express";
import { In } from "typeorm";
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";
import { connectToDatabase } from "../../data-source";
import { Company } from "../../entity/Company";
import { getBodyKeys } from "../../shared/getKeys";
import { ICreateCustomer } from "./@types/eventInput";
import { Customer } from "../../entity/Customer";

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
    const customer = new Customer();
    customer.name = body.name;
    customer.email = body.email;
    await customer.setPassword(body.password);

    if (body.companysNew === undefined) {
      customer.companys = null;
    } else {
      const dataRepository = startConnection.getRepository(Company);
      const companys = body.companysNew;
      const companysFind: Company = await dataRepository.findOne({
        where: { razaoSocial: In(companys) },
      });
      customer.companys = [companysFind];
    }
    const create = await startConnection.manager.save(customer);
    await connection.destroy();
    return successResponse("customer created", create, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
