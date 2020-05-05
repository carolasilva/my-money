import React from 'react'
import Rest from "./rest"

const baseURL = 'https://mymoney-25404.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

function App() {
  //const data = useGet('movimentacoes/2020-05')
  const data = useGet('meses')
  //const [postData, post] = usePost('movimentacoes/2020-05');
  //const [deleteData, remove] = useDelete('movimentacoes/2020-05');

  // const saveNew = () => {
  //   post({ valor: 10, descricao: 'olá'})
  // }
  //
  // const doRemove = () => {
  //   remove('-M6VYoCFRopCMZ3FbPi-')
  // }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <div className="container">
          <a className='navbar-brand' >MyMoney</a>
        </div>
      </nav>
      <div className="container">
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
        {
          !data.loading ? (
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
                        <td>{mes}</td>
                        <td>{data.data[mes].previsao_entrada}</td>
                        <td>{data.data[mes].entrada}</td>
                        <td>{data.data[mes].previsao_saida}</td>
                        <td>{data.data[mes].saida}</td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          ) : <span>Carregando...</span>
        }
      </div>
    </div>
  )
}

export default App
