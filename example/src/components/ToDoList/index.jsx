import React from "react";
import { useCallback, useState } from "react";

function ToDoList() {
  const [productTitle, setproductTitle] = useState("");
  const [products, setproducts] = useState([]);
  const [productQnt, setQnt] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(false);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (productTitle !== "" && productQnt !== "") {
        setEmptyMessage(false);
        setproducts((old) => [...old, { title: productTitle, quantity: productQnt }]);
        setproductTitle("");
        setQnt("");
      } else {
        setEmptyMessage(true);
      }
    },
    [productTitle, productQnt]
  );

  const handleDeleteproduct = useCallback(
    (index) => {
      setproducts((old) => old.filter((_, i) => i !== index));
    },
    [setproducts]
  );

  return (
    <>
      <div className="container">
        <div className="form">
          <input
            className="campos"
            type="text"
            value={productTitle}
            onChange={(e) => setproductTitle(e.target.value)}
            data-testid="product_input"
            placeholder="Produto"
          />
          <br />
          <input
            className="campos"
            type="text"
            value={productQnt}
            onChange={(e) => setQnt(e.target.value)}
            data-testid="productQnt"
            placeholder="Quantidade"
          />
          <br />
          <button onClick={handleFormSubmit} className="campos" type="submit" data-testid="product_button">
            Adicionar novo produto
          </button>
          {emptyMessage && <p>Os campos não podem estar vazios!</p>}
        </div>
        <div className="list">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleDeleteproduct(index)} data-testid="delete_button">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
