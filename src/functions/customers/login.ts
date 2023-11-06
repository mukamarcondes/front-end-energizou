import { NextFunction, Request, Response } from "express";
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../../shared/responses";
import { connectToDatabase } from "../../data-source";
import { getBodyKeys } from "../../shared/getKeys";
import { ICustomerLogin } from "./@types/eventInput";
import { Customer } from "../../entity/Customer";

export const handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const body: ICustomerLogin = await getBodyKeys(req);

  if (!body) {
    return badRequestResponse("body must be sent", res);
  }
  try {
    const connection = await connectToDatabase();
    const startConnection = await connection.initialize();
    const userRepository = startConnection.getRepository(Customer);
    const customer = await userRepository.findOne({
      where: { email: body.email },
    });
    
    if (!customer) {
      await connection.destroy();
      return errorResponse("customer notfound", res);
    }

    const senhaCorreta = await customer.verifyPassword(body.password);

    if (!senhaCorreta) {
      await connection.destroy();
      return errorResponse("incorrect password", res);
    }

    console.log("Senha correta");
    await connection.destroy();
    return successResponse("login success", senhaCorreta, res);
  } catch (e) {
    console.log(e);
    return errorResponse(e, res);
  }
};
