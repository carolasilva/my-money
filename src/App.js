import React from 'react'
import useGet from "./useGet"
import usePost from './usePost'
import useDelete from './useDelete'

const url = 'https://mymoney-25404.firebaseio.com/movimentacoes/2020-05.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url);
  const [deleteData, remove] = useDelete();

  const saveNew = () => {
    post({ valor: 10, descricao: 'olá'})
  }

  const doRemove = () => {
    remove('https://mymoney-25404.firebaseio.com/movimentacoes/2020-05/a.json')
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
