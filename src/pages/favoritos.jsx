// import "./favoritos.css"

// function Favoritos() {
//     return (
//       <div>
//         <h1>Favoritos</h1>
//         <p>Aqui estão seus itens favoritos!</p>
//         <botton> </botton>

//       </div>

//     );
//   }
  
//   export default Favoritos;
  

import React, { useEffect, useState } from "react";
import "./favoritos.css";

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
    <div className="container">
      <h1>Favoritos</h1>
     <hr></hr>
      <div className="pokemon-list">

        {favoritos.length > 0 ? (

          favoritos.map((pokemon) => (
            
            <div key={pokemon.id} className="pokemon-card">
              <h2>{pokemon.nome}</h2>
              <img src={pokemon.imagem} alt={pokemon.nome} />
              <h4>Tipo: {pokemon.tipos}</h4>
              <button onClick={() => removerFavorito(pokemon.id)}>
                Remover
              </button>
            </div>
          ))
        ) : (
          <marquee direction= "right"><p className="texto">Você não tem nenhum Pokémon favorito.</p></marquee>
        )}
      </div>
    </div>
  );
}

export default Favoritos;