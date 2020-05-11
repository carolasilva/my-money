import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom'

const minAno = 2019
const maxAno = 2022

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

  const zeroPad = num => {
    if (num < 10)
      return '0' + num
    return num
  }

  const verMes = () => {
    setRedirect(refAno.current.value + '-' + refMes.current.value);
    console.log('ver mes', refAno.current.value, refMes.current.value);
  }

  if (redirect !== '')
    return <Redirect to={'/movimentacoes/' + redirect} />

  return (
    <>
      <h2>Adicionar mês</h2>
      <select name="ano" id="ano" ref={refAno}>
        { anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
      </select>
      <select name="mes" id="mes" ref={refMes}>
        { meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)}
      </select>
      <button onClick={verMes}>Adicionar mês</button>
    </>
  )
}

export default AddMonth