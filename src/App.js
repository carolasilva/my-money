import React from 'react'
import Rest from "./rest"

const baseURL = 'https://mymoney-25404.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

function App() {
  const data = useGet('movimentacoes/2020-05')
  const [postData, post] = usePost('movimentacoes/2020-05');
  const [deleteData, remove] = useDelete('movimentacoes/2020-05');

  const saveNew = () => {
    post({ valor: 10, descricao: 'olá'})
  }

  const doRemove = () => {
    remove('-M6VYoCFRopCMZ3FbPi-')
  }

  return (
    <div>
      <h1>My Money</h1>
      <div>
        {
          !data.loading ? (
            <div>
              {JSON.stringify(data)}
              <button onClick={saveNew}>Salvar</button>
              <pre>{JSON.stringify(postData)}</pre>
              <button onClick={doRemove}>Delete</button>
              <pre>{JSON.stringify(deleteData)}</pre>

            </div>
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    </div>
  )
}

export default App
