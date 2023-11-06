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
    console.log(startConnection.isInitialized);
    const company = new Company();
    Object.assign(company, body);
    await startConnection.manager.save(company);
    await connection.destroy();
    return successResponse("company created", company, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};

// const senhaNaoCriptografada = "minhaSenhaSecreta";

// const senhaCorreta = await customer.verificaSenha(senhaNaoCriptografada);

// if (senhaCorreta) {
//   // A senha fornecida corresponde à senha armazenada
//   console.log("Senha correta");
// } else {
//   // A senha fornecida não corresponde à senha armazenada
//   console.log("Senha incorreta");
// }
