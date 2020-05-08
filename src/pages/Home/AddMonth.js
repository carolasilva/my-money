import React from "react";

const AddMonth = () => {
  return (
    <>
      <h2>Adicionar mês</h2>
      <select name="ano" id="ano">
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
      <select name="mes" id="mes">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button>Adicionar mês</button>
    </>
  )
}

export default AddMonth