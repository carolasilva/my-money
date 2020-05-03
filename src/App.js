import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const url = 'https://mymoney-25404.firebaseio.com/movimentacoes/2020-05.json'

// pure function
const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }

  return state
}

function App() {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })

  useEffect(() => {
    dispatch({ type: 'REQUEST' })
    axios
      .get(url)
      .then(res => {
        dispatch({ type: 'SUCCESS', data: res.data })
      })
  }, []);

  return (
    <div>
      <h1>MyMoney</h1>

      { !data.loading && JSON.stringify(data) }
      { data.loading && <p>Loading... </p>}
    </div>
  );
}

export default App
