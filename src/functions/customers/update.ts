import { NextFunction, Request, Response } from "express";
import { In } from "typeorm";

import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";
import { connectToDatabase } from "../../data-source";
import { getPathKeys, getBodyKeys } from "../../shared/getKeys";
import {
  TUpdatePathParamters,
  IUpdateCustomer,
  ICreateCustomer,
} from "./@types/eventInput";
import { entityMapping } from "../../shared/entityMapping";
import { Company } from "../../entity/Company";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const pathParamters: TUpdatePathParamters = (await getPathKeys(
    req
  )) as TUpdatePathParamters;

  const body: IUpdateCustomer = await getBodyKeys(req);

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

    const customers: ICreateCustomer = await dataRepository.findOne({
      where: { id: id },
      relations: ["companys"],
    });

    if (!customers) {
      await connection.destroy();
      return errorResponse("customer not found", res);
    }

    if (body.updateCompanys && Array.isArray(body.updateCompanys)) {
      // Adicionar informações em updateCompanys sem substituir
      const dataRepositoryCompany = startConnection.getRepository(Company);
      const companys: Company[] = await dataRepositoryCompany.find({
        where: { razaoSocial: In(body.updateCompanys as string[]) },
      });

      if (!companys) {
        await connection.destroy();
        return errorResponse("companys not found", res);
      }

      for (const company of companys) {
        if (
          !customers.companys.find((c) => c.razaoSocial === company.razaoSocial)
        ) {
          customers.companys.push(company);
        }
      }
    }

    if (body.setCompanys && Array.isArray(body.setCompanys)) {
      // Atualizar informações em setCompanys
      const dataRepositoryCompany = startConnection.getRepository(Company);
      const companys: Company = await dataRepositoryCompany.findOne({
        where: { razaoSocial: In(body.setCompanys as string[]) },
      });

      if (!companys) {
        await connection.destroy();
        return errorResponse("companys not found", res);
      }

      customers.companys = [companys];
    }

    if (!body.setCompanys && !body.updateCompanys) {
      customers.companys = [];
    }

    const updateResult = await dataRepository.manager.save(customers);

    await connection.destroy();
    return successResponse("customer successfully updated", updateResult, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
