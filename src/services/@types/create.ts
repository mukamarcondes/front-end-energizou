export type TCreateCustomerBody = {
  name: string;
  email: string;
  password: string;
};

export type TCreateCompanyBody = {
  razaoSocial: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  telefone: string;
};
