import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

const routeLogger = (req: Request, _res: Response, next: NextFunction) => {
  const now = new Date();
  const timestamp = chalk.gray(`[${now.toLocaleString("pt-BR")}]`);
  const method = chalk.green(req.method);
  const url = chalk.cyan(req.originalUrl);
  console.log(`\n${timestamp} ${method} ${url}`);

  next();
};

export default routeLogger;
