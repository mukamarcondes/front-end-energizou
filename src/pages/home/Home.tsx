import Eu from "../../img/Captura de tela 2023-10-31 121350.png";
import Lixo from "../../img/lata-de-lixo (1).png";
import Lapis from "../../img/lapis.png";
import "./home.css";
import { deleteData, getCustomersAndCompanys } from "../../services/Api";
import CustomModal from "../../components/customModal";
import ModalCreate from "../../components/modalCreate";

import React, { useEffect, useState } from "react";
import { TItemReceived } from "./@types/recivedItem";
import {
  TUpdateCustomerBody,
  TUpdateCompanyBody,
} from "../../services/@types/update";
// import Contatos from "../editar/editar";

function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await getCustomersAndCompanys();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Modal
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModalEdit = (item: any) => {
    console.log(item);
    setSelectedItem(item);
    setModalIsOpenEdit(true);
  };

  const closeModalEdit = () => {
    setModalIsOpenEdit(false);
  };
  const saveChanges = (updatedItem: any) => {
    const index = data.findIndex((item: any) => item.id === selectedItem.id);
    const updatedData = [...data];
    updatedData[index] = updatedItem;
    setData(updatedData);
    setModalIsOpenEdit(false);
  };

  const deleteInfos = async (item: TItemReceived) => {
    const {
      email,
      id: id_customer,
      password,
      name,
    }: TUpdateCustomerBody = item;
    const {
      cep,
      cnpj,
      endereco,
      id: id_company,
      numero,
      razaoSocial,
      telefone,
    }: TUpdateCompanyBody = item.companys;
    const deleteInfos = await deleteData(
      { email, id: id_customer, password, name },
      {
        cep,
        cnpj,
        endereco,
        id: id_company,
        numero,
        razaoSocial,
        telefone,
      }
    );

    if (deleteInfos.statusCode !== 200) {
      console.log("deu ruim");
    }

    getData();
  };

  // Modal Create

  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);

  const openModalCreate = () => {
    setModalIsOpenCreate(true);
  };

  const closeModalCreate = () => {
    setModalIsOpenCreate(false);
  };

  const saveChangesCreate = () => {
    setModalIsOpenCreate(false);
    getData();
  };

  return (
    <>
      {loading ? (
        <div>... Data Loading ...</div>
      ) : (
        <div className="geral">
          <div className="t">
            <div className="topo">
              <img className="logo" src={Eu} alt="minha foto" />
            </div>

            <div className="Subtopo">
              <div className="row">
                <h1>Empresas Cadastradas</h1>
                <button className="botão3" onClick={() => openModalCreate()}>
                  Novo
                </button>
                <ModalCreate
                  isOpen={modalIsOpenCreate}
                  onClose={closeModalCreate}
                  onSave={saveChangesCreate}
                />
              </div>

              <div className="pes">
                <form className="search-container">
                  <input
                    type="text"
                    id="search-bar"
                    placeholder="Pesquisar"></input>
                </form>
              </div>
            </div>
          </div>
          {/* tabela */}

          <table style={{ border: "1px" }}>
            <thead>
              <tr className="linha1">
                <th>ID</th>
                <th>Empresa</th>
                <th>Cliente</th>
                <th>CNPJ</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            {/* <br /> */}
            <tbody>
              {data ? (
                data.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.companys !== undefined
                        ? item.companys.razaoSocial
                        : "not found..."}
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.companys !== undefined
                        ? item.companys.cnpj
                        : "not found..."}
                    </td>
                    <td>
                      <button onClick={() => openModalEdit(item)}>
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={Lapis}
                          alt="Editar"
                        />
                      </button>
                      <CustomModal
                        isOpen={modalIsOpenEdit}
                        onClose={closeModalEdit}
                        onSave={saveChanges}
                        selectedItem={selectedItem}
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteInfos(item)}>
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={Lixo}
                          alt="Excluir"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>Carregando...</td>
                </tr>
              )}
            </tbody>
            <br />
          </table>
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
}

export default Home;
