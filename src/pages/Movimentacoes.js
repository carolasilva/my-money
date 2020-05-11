import React, { useState } from "react";
import Rest from "../utils/rest"
const baseURL = 'https://mymoney-25404.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete(`movimentacoes/${match.params.data}`)
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }

  const salvarMovimentacao = async() => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+((\.)?\d+?)?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor('')
      data.refetch()
    }
  }

  const removerMovimentacao = async(id) => {
    await remover(id)
    data.refetch()
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            data.data &&
              Object
                .keys(data.data)
                .map(movimentacao => {
                  return (
                    <tr key={movimentacao}>
                      <td>{data.data[movimentacao].descricao}</td>
                      <td className='text-right'>
                        {data.data[movimentacao].valor}
                        <button className='btn btn-danger ml-3' onClick={() => removerMovimentacao(movimentacao)}>-</button>
                      </td>
                    </tr>
                  )
                })
          }
          <tr>
            <td>
              <input type="text" value={descricao} onChange={onChangeDescricao}/>
            </td>
            <td>
              <input type="text" value={valor} onChange={onChangeValor}/>
              <button className='btn btn-success ml-2' onClick={salvarMovimentacao}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes