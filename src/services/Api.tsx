import axios from "axios";
import { TUpdateCompanyBody, TUpdateCustomerBody } from "./@types/update.ts";
import { TCreateCustomerBody, TCreateCompanyBody } from "./@types/create.ts";

const urlBacked = "https://api-energizou.vercel.app";
export const getCustomersAndCompanys = async () => {
  try {
    const response = await axios.get(urlBacked + "/read/customer/all/0");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const loginCustomers = async (password: string, email: string) => {
  try {
    const response = await axios({
      method: "post",
      url: urlBacked + "/customers/login",
      data: {
        email,
        password,
      },
    });
    return {
      statusCode: 200,
      data: response.data.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};

export const updateData = async (
  customerBody: TUpdateCustomerBody,
  companysBody: TUpdateCompanyBody
) => {
  try {
    const responseUpdateCompany = await axios({
      method: "put",
      url: urlBacked + "/companys/update/company/" + companysBody.id,
      data: {
        razaoSocial: companysBody.razaoSocial,
        cnpj: companysBody.cnpj,
        cep: companysBody.cep,
        endereco: companysBody.endereco,
        numero: companysBody.numero,
        telefone: companysBody.telefone,
      },
    });

    const responseUpdateCustomer = await axios({
      method: "put",
      url: urlBacked + "/customers/update/customer/" + customerBody.id,
      data: {
        email: customerBody.email,
        name: customerBody.name,
        password: customerBody.password,
        setCompanys: [companysBody.razaoSocial],
      },
    });

    return {
      statusCode: 200,
      data: responseUpdateCustomer.data.data,
      data2: responseUpdateCompany.data.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};
export const createData = async (
  customerBody: TCreateCustomerBody,
  companysBody: TCreateCompanyBody
) => {
  try {
    const responseUpdateCompany = await axios({
      method: "post",
      url: urlBacked + "/companys",
      data: {
        razaoSocial: companysBody.razaoSocial,
        cnpj: companysBody.cnpj,
        cep: companysBody.cep,
        endereco: companysBody.endereco,
        numero: companysBody.numero,
        telefone: companysBody.telefone,
      },
    });

    const responseUpdateCustomer = await axios({
      method: "post",
      url: urlBacked + "/customers",
      data: {
        email: customerBody.email,
        name: customerBody.name,
        password: customerBody.password,
        companysNew: [companysBody.razaoSocial],
      },
    });

    return {
      statusCode: 200,
      data: responseUpdateCustomer.data.data,
      data2: responseUpdateCompany.data.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};

export const deleteData = async (
  customerBody: TUpdateCustomerBody,
  companysBody: TUpdateCompanyBody
) => {
  try {
    const responseUpdateCompany = await axios({
      method: "delete",
      url: urlBacked + "/companys",
      data: {
        id: companysBody.id,
        razaoSocial: companysBody.razaoSocial,
        cnpj: companysBody.cnpj,
        cep: companysBody.cep,
        endereco: companysBody.endereco,
        numero: companysBody.numero,
        telefone: companysBody.telefone,
      },
    });

    const responseUpdateCustomer = await axios({
      method: "delete",
      url: urlBacked + "/customers",
      data: {
        id: customerBody.id,
        email: customerBody.email,
      },
    });

    return {
      statusCode: 200,
      data: responseUpdateCustomer.data.data,
      data2: responseUpdateCompany.data.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};
