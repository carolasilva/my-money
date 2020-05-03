import React from 'react'
import useGet from "./useGet"

const url = 'https://mymoney-25404.firebaseio.com/movimentacoes/2020-05.json'

function App() {
  const data = useGet(url)
  const data2 = useGet('http://httpbin.org/ip')
  return (
    <div>
      <h1>My Money</h1>
      <div>
        {
          !data.loading ? (
            <div>
              {JSON.stringify(data)}
              {JSON.stringify(data2)}
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
