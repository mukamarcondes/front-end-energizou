import { Customer } from "../../../entity/Customer";

export type TUpdatePathParamters = {
  id: string;
  where: string;
};

export interface ICreateCustomer extends Customer {
  companysNew: string[];
}

export interface ICustomerLogin {
  email: string;
  password: string;
}

export interface IReadCustomer {
  form: string;
  parameter: string;
}

export interface IUpdateCustomer extends Customer {
  updateCompanys: string[];
  setCompanys: string[];
}
