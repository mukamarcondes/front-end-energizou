import { useState } from "react";
import "../modals.css";
import { createData } from "../../services/Api";
import {
  TCreateCustomerBody,
  TCreateCompanyBody,
} from "../../services/@types/create";

function ModalCreate({ isOpen, onClose, onSave }: any) {
  const [bodyItemBase, setBodyItemBase] = useState({
    name: "",
    email: "",
    password: "",
    companys: {
      razaoSocial: "",
      cnpj: "",
      cep: "",
      endereco: "",
      numero: "",
      telefone: "",
    },
  });
  const [verifypass, setVerifypass] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setVerifypass("");
    onClose();
  };

  const handleInputChange = (e: any, where?: string) => {
    const { name, value } = e.target;
    if (where === "verifypass") {
      setVerifypass(value);
    } else {
      setBodyItemBase({ ...bodyItemBase, [name]: value });
    }
  };

  const handleCompanyInputChange = (e: any) => {
    const { name, value } = e.target;
    setBodyItemBase((prevItem: any) => {
      const updatedCompanys = { ...prevItem.companys };
      updatedCompanys[name] = value;
      return { ...prevItem, companys: updatedCompanys };
    });
  };

  const handleCreate = async () => {
    if (bodyItemBase.password !== verifypass) {
      alert("Senhas não coincidem. Por favor, verifique sua senha.");
      return;
    }

    const { email, password, name }: TCreateCustomerBody = bodyItemBase;

    const {
      cep,
      cnpj,
      endereco,
      numero,
      razaoSocial,
      telefone,
    }: TCreateCompanyBody = bodyItemBase.companys;

    const updateDataBase = await createData(
      { email, password, name },
      {
        cep,
        cnpj,
        endereco,
        numero,
        razaoSocial,
        telefone,
      }
    );
    console.log(updateDataBase);
    onSave();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Criar Nova Empresa</h2>

        <div className="modalEntries">
          {Object.entries(bodyItemBase).map(([key, value]: [any, any]) => {
            if (["createdAt", "updatedAt", "id", "companys"].includes(key))
              return null;
            let inputType = "text";
            if (key === "password") {
              inputType = "password";
            } else if (key === "email") {
              inputType = "email";
            }

            const keyModfied = key.toLowerCase();

            return (
              <div className="cell" key={key}>
                <label htmlFor={key}>{key}:</label>
                <input
                  type={inputType}
                  name={key}
                  placeholder={keyModfied}
                  value={value} // Atualiza o valor corretamente
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            );
          })}
          <div className="cell" key="">
            <label htmlFor="verifypass">Confirme Sua Senha:</label>
            <input
              type="password"
              name="verifypass"
              placeholder="verifypass"
              value={verifypass}
              onChange={(e) => handleInputChange(e, "verifypass")}
            />
          </div>
        </div>
        <h2>Informações da Empresa</h2>
        <div className="modalEntries">
          {Object.entries(bodyItemBase.companys).map(([key, value]: any) => {
            if (["createdAt", "updatedAt", "id"].includes(key)) return null;
            const keyModfied = key.toLowerCase();
            return (
              <div className="cell" key={key}>
                <label htmlFor={key}>{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  placeholder={keyModfied}
                  onChange={(e) => handleCompanyInputChange(e)}
                />
              </div>
            );
          })}
          <button onClick={handleCreate}>Criar</button>
          <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreate;
