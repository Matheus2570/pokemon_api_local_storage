import React, { useState, useEffect } from 'react';
import "./botao.css"

// Definição do componente MudarTema
const MudarTema = () => {
  // Verifica se já existe um valor salvo no localStorage para o tema. Caso não exista, o tema padrão será 'light'
  const temaSalvo = localStorage.getItem('tema') || 'light';

  // Definindo o estado para armazenar o tema. O estado inicial será o valor salvo ou 'light'
  const [tema, setTema] = useState(temaSalvo);

  // Efeito colateral (useEffect) que será executado sempre que o tema mudar
  useEffect(() => {
    // Salva o novo valor do tema no localStorage, para que ele persista entre as visitas à página
    localStorage.setItem('tema', tema);
    
    // Altera a classe do elemento <body> para o tema atual. Isso aplica o estilo correspondente ao tema
    document.body.className = tema;
  }, [tema]); // O efeito é executado sempre que o tema mudar

  // Função para alternar entre os temas 'light' e 'dark'
  const alternarTema = () => {
    // Muda o estado do tema entre 'light' e 'dark'. Se o tema atual for 'light', muda para 'dark', e vice-versa
    setTema(prevTema => (prevTema === 'light' ? 'dark' : 'light'));
  };

  // Renderiza o componente. Retorna um botão que permite alternar entre os temas
  return (
    <div>
      {/* Botão que chama a função alternarTema ao ser clicado */}
      <button className="botao-tema" onClick={alternarTema}>
        {/* O texto do botão muda dependendo do tema atual */}
        {tema === 'light' ? 'Tema Claro ☀️ ' : 'Tema Escuro 🌙'}
      </button>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default MudarTema;
