import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToDoList from "./index";

describe("<ToDoList />", () => {
  it("renderizar input de título da tarefa", () => {
    render(<ToDoList />);
  
    const input = screen.getByTestId("product_input");
  
    expect(input);
  });

  it("renderizar botão de adicionar tarefa", () => {
    render(<ToDoList />);
  
    const button = screen.getByTestId("product_button");
  
    expect(button);
  });

  it("renderizar tabela de tarefas", () => {
    render(<ToDoList />);
  
    const table = screen.getByRole("table");
  
    expect(table);
  });

  it("adicionar tarefa à lista de tarefas", () => {
    render(<ToDoList />);
  
    const inputTitle = screen.getByTestId("product_input");
    const inputQuantity = screen.getByTestId("productQnt");
    const button = screen.getByTestId("product_button");
  
    fireEvent.change(inputTitle, { target: { value: "Produto 1" } });
    fireEvent.change(inputQuantity, { target: { value: "10" } });
    fireEvent.click(button);
  
    const table = screen.getByRole("table");
    const row = screen.getByText("Produto 1");
  
    expect(table).toContainElement(row);
  });

  it("excluir tarefa da lista de tarefas", () => {
    render(<ToDoList />);
  
    const inputTitle = screen.getByTestId("product_input");
    const inputQuantity = screen.getByTestId("productQnt");
    const buttonAdd = screen.getByTestId("product_button");
  
    fireEvent.change(inputTitle, { target: { value: "Produto 1" } });
    fireEvent.change(inputQuantity, { target: { value: "10" } });
    fireEvent.click(buttonAdd);

    const buttonDelete = screen.getByTestId("delete_button");
    fireEvent.click(buttonDelete);
  
    const table = screen.getByRole("table");
    const row = screen.queryByText("Produto 1");
  
    expect(row).toBeNull();
    expect(table).not.toContainElement(row);
  });

});