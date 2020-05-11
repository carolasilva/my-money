import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom'
import Meses from '../../utils/gerenciaMeses'
const { valorParaNome } = Meses()

const minAno = new Date().getFullYear();
const maxAno = minAno + 5

const AddMonth = () => {
  const refAno = useRef()
  const refMes = useRef()
  const [redirect, setRedirect] = useState('');
  const anos = [];
  const meses = []
  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i);
  }
  for (let i=1; i<=12; i++) {
    meses.push(i);
  }



  const verMes = () => {
    setRedirect(refAno.current.value + '-' + refMes.current.value);
    console.log('ver mes', refAno.current.value, refMes.current.value);
  }

  if (redirect !== '')
    return <Redirect to={'/movimentacoes/' + redirect} />

  return (
    <div className='mb-4'>
      <h2 className='mt-4 mb-3'>Adicionar mês</h2>
      <div className="input-group col-md-6">
        <select className='custom-select' name="mes" id="mes" ref={refMes}>
          { meses.map(valorParaNome).map((mes, indice) => <option key={mes} value={meses[indice]} selected={indice == new Date().getMonth() ? 'true' : ''}>{mes}</option>)}
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor="mes">Mês</label>
        </div>
        <select className='custom-select ml-3' name="ano" id="ano" ref={refAno}>
          { anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor="ano">Ano</label>
        </div>
        <button className='ml-4 btn btn-light' type='button' onClick={verMes}>Adicionar mês</button>
      </div>
    </div>
  )
}

export default AddMonth