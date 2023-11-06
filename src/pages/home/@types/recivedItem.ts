export type TItemReceived = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  companys: {
    id: number;
    razaoSocial: string;
    cnpj: string;
    cep: string;
    endereco: string;
    numero: string;
    telefone: string;
    createdAt: string;
    updatedAt: string;
  };
};
