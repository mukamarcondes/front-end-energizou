import "reflect-metadata";
import { Company } from "../entity/Company";
import { Customer } from "../entity/Customer";
import { EntityTarget } from "typeorm";

export const entityMapping: Record<string, EntityTarget<any>> = {
  company: Company,
  customer: Customer,
};

export const entityRelations: Record<string, string[] | boolean> = {
  company: false,
  customer: ["companys"],
};
