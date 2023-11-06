import { useState, useEffect } from "react";
import "../modals.css";
import { loginCustomers, updateData } from "../../services/Api";
import {
  TUpdateCustomerBody,
  TUpdateCompanyBody,
} from "../../services/@types/update";

function CustomModalEdit({ isOpen, onClose, selectedItem, onSave }: any) {
  const [editedItem, setEditedItem] = useState<any>(selectedItem || {});
  const [verifypass, setVerifypass] = useState("");

  useEffect(() => {
    setEditedItem({ ...selectedItem });
  }, [selectedItem]);

  if (!isOpen || !selectedItem) return null;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleCompanyInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedItem((prevItem: any) => {
      const updatedCompanys = { ...prevItem.companys };
      updatedCompanys[name] = value;
      return { ...prevItem, companys: updatedCompanys };
    });
  };

  const handleSave = async () => {
    try {
      if (editedItem.password !== verifypass) {
        alert("Senhas não coincidem. Por favor, verifique sua senha.");
        setVerifypass("");
        return;
      }
      const result = await loginCustomers(
        editedItem.password,
        editedItem.email
      );
      if (result.statusCode !== 200) {
        alert(
          "Falha ao verificar suas senhas. Por favor, verifique sua senha."
        );
        console.log("login error", result.data);
        return;
      }
      const {
        email,
        id: id_customer,
        password,
        name,
      }: TUpdateCustomerBody = editedItem;
      const {
        cep,
        cnpj,
        endereco,
        id: id_company,
        numero,
        razaoSocial,
        telefone,
      }: TUpdateCompanyBody = editedItem.companys;
      const updateDataBase = await updateData(
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
      console.log(updateDataBase);
      setVerifypass("");
      onSave(editedItem);
    } catch (error) {
      console.error("Erro ao fazer login e dar update", error);
    }
  };

  const handleClose = () => {
    setVerifypass("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Alterar informações Do Customer</h2>
        <div className="modalEntries">
          {editedItem
            ? Object.entries(editedItem).map(([key, value]: [any, any]) => {
                if (["createdAt", "updatedAt", "id"].includes(key)) return null;

                let inputType = "text";
                let valueMutate = value;
                let disabledFlag = false;
                if (key === "password") {
                  valueMutate = null;
                  inputType = "password";
                }
                if (key === "email") {
                  disabledFlag = true;
                  inputType = "email";
                }
                const keyModfied = key.toLowerCase();

                if (typeof value === "string" || typeof value === "number") {
                  return (
                    <div className="cell" key={key}>
                      <label htmlFor={key}>{key}:</label>
                      <input
                        type={inputType}
                        name={key}
                        value={valueMutate}
                        placeholder={keyModfied}
                        title={valueMutate}
                        onChange={handleInputChange}
                        disabled={disabledFlag}
                      />
                    </div>
                  );
                }
                return null;
              })
            : null}
          <div className="cell" key="">
            <label htmlFor="none">Confirme Sua Senha:</label>
            <input
              type="password"
              name="verifypass"
              className="cell"
              placeholder="verifypass"
              value={verifypass}
              onChange={(e) => {
                setVerifypass(e.target.value);
              }}
            />
          </div>
        </div>
        <h2>Alterar informações Da Empresa</h2>
        <div className="modalEntries">
          {editedItem.companys
            ? Object.entries(editedItem.companys).map(([key, value]: any) => {
                if (["createdAt", "updatedAt", "id"].includes(key)) return null;
                if (typeof value === "string") {
                  const keyModfied = key.toLowerCase();
                  return (
                    <div className="cell" key={key}>
                      <label htmlFor={key}>{key}:</label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        placeholder={keyModfied}
                        title={value}
                        onChange={(e) => handleCompanyInputChange(e)}
                      />
                    </div>
                  );
                }
                return null;
              })
            : null}
          <button onClick={handleSave}>Salvar</button>
          <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default CustomModalEdit;
