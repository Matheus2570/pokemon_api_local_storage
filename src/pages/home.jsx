// Importando o hook useState do React para gerenciar os estados do componente
import { useState } from "react";
// Importando o arquivo de estilos CSS do componente
import "./home.css";
// Importando o componente Botao para ser utilizado na interface
import Botao from "../components/botao"

// Função principal do componente PokemonSearch
function PokemonSearch() {
  // Declaração de estados:
  const [search, setSearch] = useState(""); // Estado para armazenar o texto digitado na barra de busca
  const [pokemon, setPokemon] = useState(null); // Estado para armazenar os dados do Pokémon pesquisado
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  // Função assíncrona para buscar o Pokémon da API
  const fetchPokemon = async () => {
    // Verifica se o campo de busca está vazio
    if (!search.trim()) {
      setError("Por favor, digite o nome ou ID do Pokémon."); // Exibe mensagem de erro se o campo estiver vazio
      setPokemon(null); // Limpa qualquer dado do Pokémon anterior
      return; // Interrompe a execução da função se o campo estiver vazio
    }

    try {
      // Faz a requisição para a API do Pokémon com o nome ou ID fornecido
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      
      // Se a resposta não for ok (por exemplo, Pokémon não encontrado), gera um erro
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }

      // Se a resposta for válida, converte a resposta em JSON
      const data = await response.json();
      
      // Atualiza o estado com os dados do Pokémon
      setPokemon({
        nome: data.name, // Nome do Pokémon
        imagem: data.sprites.front_default, // Imagem do Pokémon
        tipos: data.types.map((t) => t.type.name).join(", "), // Tipos do Pokémon, unidos por vírgula
      });

      // Limpa qualquer mensagem de erro
      setError(null);
    } catch (err) {
      // Se ocorrer um erro (como Pokémon não encontrado), atualiza o estado com a mensagem de erro
      setError(err.message);
      setPokemon(null); // Limpa os dados do Pokémon
    }
  };

  // Função para adicionar o Pokémon pesquisado aos favoritos
  const adicionarAosFavoritos = () => {
    // Se não houver Pokémon, não faz nada
    if (!pokemon) return;
    
    // Obtém os favoritos do localStorage (ou cria um array vazio se não houver)
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    // Adiciona o Pokémon atual à lista de favoritos
    favoritos.push(pokemon);
    
    // Salva a lista de favoritos atualizada no localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
    // Exibe um alerta informando que o Pokémon foi adicionado aos favoritos
    alert("Pokémon adicionado aos favoritos!");
  };

  return (
    <>
      {/* Seção que contém o componente Botao */}
      <div className="botao">
        <Botao />
      </div>

      {/* Container principal do componente */}
      <div className="container">
        {/* Campo de input para o nome ou ID do Pokémon */}
        <input
          type="text"
          placeholder="Digite o nome ou ID do Pokémon"
          value={search} // Valor controlado do campo de busca
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado de "search" ao digitar
          className="input-field"
        />
        
        {/* Botão que dispara a função de buscar o Pokémon */}
        <button onClick={fetchPokemon} className="button">
          Buscar Pokémon
        </button>

        {/* Exibe uma mensagem de erro, se houver */}
        {error && <p className="error-message">{error}</p>}

        {/* Se o Pokémon for encontrado, exibe os dados do Pokémon */}
        {pokemon && (
          <div className="pokemon-card">
            {/* Exibe o nome do Pokémon */}
            <h2>{pokemon.nome.toUpperCase()}</h2>
            {/* Exibe a imagem do Pokémon */}
            <img src={pokemon.imagem} alt={pokemon.nome} />
            {/* Exibe os tipos do Pokémon */}
            <p>Tipo: {pokemon.tipos}</p>
            {/* Botão para adicionar o Pokémon aos favoritos */}
            <button onClick={adicionarAosFavoritos} className="favorites-button">
              Adicionar aos Favoritos
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// Exporta o componente PokemonSearch para ser utilizado em outras partes do aplicativo
export default PokemonSearch;
