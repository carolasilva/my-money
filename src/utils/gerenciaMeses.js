import React from 'react'

const GerenciaMeses = () => {
  const valorParaNome = num => {
    switch (num) {
      case 1: return 'Janeiro';
      case 2: return 'Fevereiro';
      case 3: return 'Março';
      case 4: return 'Abril';
      case 5: return 'Maio';
      case 6: return 'Junho';
      case 7: return 'Julho';
      case 8: return 'Agosto';
      case 9: return 'Setembro';
      case 10: return 'Outubro';
      case 11: return 'Novembro';
      case 12: return 'Dezembro';
    }
  }

  const formataData = data => {
    const dataDespedacada = data.toString().split('-')
    const mes = dataDespedacada[1]
    const ano = dataDespedacada[0]

    return valorParaNome(parseInt(mes)) + ' / ' + ano
  }

  return {valorParaNome, formataData}
}


export default GerenciaMeses;