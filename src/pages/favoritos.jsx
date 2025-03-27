import React, { useEffect, useState } from "react";
import "./favoritos.css";
import Botao from "../components/botao"

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Carregar os favoritos do localStorage ao montar o componente
  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Se não houver favoritos, retorna um array vazio
    setFavoritos(storedFavoritos);
  }, []);

  // Função para remover um Pokémon dos favoritos
  const removerFavorito = (id) => {
    const novosFavoritos = favoritos.filter((pokemon) => pokemon.id !== id); // Filtra os favoritos, removendo o Pokémon com o ID passado
    setFavoritos(novosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  };

  return (
    <>
    <div className="botaozao">
    <Botao/>
    </div>

    <div className="favoritos-container">
      <h1 className="favoritos-titulo">Favoritos</h1>
      <hr className="favoritos-linha" />
      <div className="pokemon-lista">
        {favoritos.length > 0 ? (
          favoritos.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card-favoritos">
              <h2>{pokemon.nome}</h2>
              <img src={pokemon.imagem} alt={pokemon.nome} />
              <h4>Tipo: {pokemon.tipos}</h4>
              <button className="remover-botao" onClick={() => removerFavorito(pokemon.id)}>
                Remover
              </button>
            </div>
          ))
        ) : (
          <marquee className="mensagem-sem-favoritos" direction="right">
            Você não tem nenhum Pokémon favorito.
          </marquee>
        )}
      </div>
    </div>
    </>
  );
}

export default Favoritos;
