import React from 'react'
import { Link } from 'react-router-dom'
import Rest from "../../utils/rest"
const baseURL = 'https://mymoney-25404.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Months = () => {
  const data = useGet('meses')
  if (data.loading) {
    return <span>Carregando...</span>
  }
  if (data.data) {
    return (
      <table className="table">
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
          Object.keys(data.data).map(mes => {
            return (
              <tr key={mes}>
                <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                <td>{data.data[mes].previsao_entrada}</td>
                <td>{data.data[mes].entradas}</td>
                <td>{data.data[mes].previsao_saida}</td>
                <td>{data.data[mes].saidas}</td>
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