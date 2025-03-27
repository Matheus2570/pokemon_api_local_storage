import React, { useState, useEffect } from 'react';
import "./botao.css"

const MudarTema = () => {
  // Verifica se já existe um valor salvo no localStorage
  const temaSalvo = localStorage.getItem('tema') || 'light';

  // Estado para armazenar o tema
  const [tema, setTema] = useState(temaSalvo);

  // Efeito para atualizar o localStorage sempre que o tema mudar
  useEffect(() => {
    localStorage.setItem('tema', tema);
    document.body.className = tema; // Adiciona a classe correspondente ao corpo do site
  }, [tema]); // Esse efeito é executado toda vez que o tema mudar

  // Função para alternar entre os temas
  const alternarTema = () => {
    setTema(prevTema => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <button className="botao-tema" onClick={alternarTema}>
       {tema === 'light' ? 'Tema Claro ☀️ ' : 'Tema Escuro 🌙'}
      </button>
    </div>
  );
};

export default MudarTema;
