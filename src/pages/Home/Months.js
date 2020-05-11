import React from 'react'
import { useHistory } from 'react-router-dom'
import Rest from "../../utils/rest"
import Meses from '../../utils/gerenciaMeses'

const baseURL = 'https://mymoney-25404.firebaseio.com/'
const { useGet } = Rest(baseURL)
const { valorParaNome, formataData } = Meses()

const Months = () => {
  const data = useGet('meses')
  const history = useHistory();

  const handleRedirect = (mes) => {
    history.push(`/movimentacoes/${mes}`)
  }

  if (data.loading) {
    return <span>Carregando...</span>
  }
  if (data.data) {
    return (
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Mês</th>
          <th>Previsão entrada</th>
          <th>Entrada</th>
          <th>Previsão saída</th>
          <th>Saída</th>
        </tr>
        </thead>
        <tbody>
        {
          Object.keys(data.data).map((mes, indice) => {
            return (
              <tr className='cursor-pointer' key={mes} onClick={() => handleRedirect(mes)}>
                <td>{formataData(mes)}</td>
                <td>{data.data[mes].previsao_entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{data.data[mes].entradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{data.data[mes].previsao_saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{data.data[mes].saidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            )
          })
        }

        </tbody>
      </table>
    )
  }
  return null;
}

export default Months