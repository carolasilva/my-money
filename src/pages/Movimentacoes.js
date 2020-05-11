import React, {useState, useRef, useEffect} from "react";
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../utils/Form/Input'
import InputMoney from '../utils/Form/InputMoney'

import Rest from "../utils/rest"
import Meses from '../utils/gerenciaMeses'

const baseURL = 'https://mymoney-25404.firebaseio.com/'
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL)

const Movimentacoes = ({match}) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete(`movimentacoes/${match.params.data}`)
  const [patchData, patch] = usePatch(`meses/${match.params.data}`)
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [previsaoEntrada, setPrevisaoEntrada] = useState(0);
  const [previsaoSaida, setPrevisaoSaida] = useState(0);
  const formRef = useRef(null);
  const formRefDados = useRef(null);

  useEffect(() => {
    if (dataMeses.data !== null) {
      formRefDados.current.setFieldValue('previsao_entrada', parseFloat(dataMeses.data.previsao_entrada))
      formRefDados.current.setFieldValue('previsao_saida', parseFloat(dataMeses.data.previsao_saida))
    }
  }, [dataMeses]);


  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }

  const onChangePrevisaoEntrada = evt => {
    setPrevisaoEntrada(evt.target.value)
  }

  const onChangePrevisaoSaida = evt => {
    setPrevisaoSaida(evt.target.value)
  }

  const atualizarTabela = () => {
    setDescricao('')
    setValor('')
    data.refetch()
    dataMeses.refetch()
  }

  const salvarMovimentacao = async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        descricao: Yup.string().required('Este campo é obrigatório'),
        valor: Yup
                .number()
                .typeError('Valor deve ser um número positivo')
                .required('Este campo é obrigatório')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await salvar({
        descricao: data.descricao,
        valor: parseFloat(data.valor)
      })

      atualizarTabela()
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  const removerMovimentacao = async (id) => {
    await remover(id)
    atualizarTabela()
  }

  const alterarPrevisaoEntrada = (evt) => {
    const valor = evt.target.value.replace(/\D+/g, "");
    const parteDecimal = valor.substr(valor.length - 2);
    const parteInteira = valor.substr(0, valor.length - 2)
    patch({previsao_entrada: parseFloat(parteInteira + '.' + parteDecimal)})
    setPrevisaoEntrada(parseFloat(parteInteira + '.' + parteDecimal))
    setTimeout(() => dataMeses.refetch(), 500)

  }

  const alterarPrevisaoSaida = (evt) => {
    const valor = evt.target.value.replace(/\D+/g, "");
    const parteDecimal = valor.substr(valor.length - 2);
    const parteInteira = valor.substr(0, valor.length - 2)
    patch({previsao_saida: parseFloat(parteInteira + '.' + parteDecimal)})
    setPrevisaoEntrada(parseFloat(parteInteira + '.' + parteDecimal))
    setTimeout(() => dataMeses.refetch(), 500)
  }


  return (
    <div className="container mt-4">
      <Form ref={formRefDados}>
      <h1 className="mb-4">Movimentações</h1>
      {
        dataMeses.data && (
          <table className="table mb-4">
            <thead>
              <tr>
                <th>Previsão entrada</th>
                <th>Entradas</th>
                <th>Previsão saída</th>
                <th>Saídas</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <InputMoney id='previsao_entrada' name='previsao_entrada' type="text" value={previsaoEntrada} onBlur={alterarPrevisaoEntrada}
                       otherOnChange={onChangePrevisaoEntrada}
                />
              </td>
              <td> {parseFloat(dataMeses.data.entradas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>
                <InputMoney id='previsao_saida' name='previsao_saida' type="text" value={previsaoSaida} onBlur={alterarPrevisaoSaida}
                            otherOnChange={onChangePrevisaoSaida} />
              </td>
              <td>{parseFloat(dataMeses.data.saidas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
            </tbody>
          </table>
        )
      }
      </Form>
      <Form className="form" ref={formRef} onSubmit={salvarMovimentacao}>
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
                      {data.data[movimentacao].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      <button type='button' className='btn btn-danger ml-3' onClick={() => removerMovimentacao(movimentacao)}>-
                      </button>
                    </td>
                  </tr>
                )
              })
          }
            <tr>
              <td>
                <Input name='descricao' type="text"  value={descricao} onChange={onChangeDescricao}
                       placeholder="Descrição"/>
              </td>
              <td>
                <Input name='valor' type="text" value={valor} onChange={onChangeValor} placeholder="Valor" icon='+' />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  )
}

export default Movimentacoes