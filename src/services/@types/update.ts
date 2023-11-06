import { TCreateCompanyBody, TCreateCustomerBody } from "./create.ts";

export type TUpdateCustomerBody = TCreateCustomerBody & {
  id: number;
};

export type TUpdateCompanyBody = TCreateCompanyBody & {
  id: number;
};
