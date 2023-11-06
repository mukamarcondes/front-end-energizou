import { Company } from "../../../entity/Company";

export type TUpdatePathParamters = {
  id: string;
  where: string;
};

export interface ICreateCompany extends Company {}

export interface IUpdateCompany extends Company {}
