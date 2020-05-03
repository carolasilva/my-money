import React from 'react'
import useGet from "./useGet"
import usePost from './usePost'

const url = 'https://mymoney-25404.firebaseio.com/movimentacoes/2020-05.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url);

  const saveNew = () => {
    post({ valor: 10, descricao: 'olá'})
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
