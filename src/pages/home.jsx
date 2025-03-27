import { useState } from "react";
import "./home.css";
import Botao from "../components/botao"

// Função principal do componente PokemonSearch
export default function PokemonSearch() {
  // Definindo o estado para o valor da busca, o Pokémon encontrado e mensagens de erro
  const [search, setSearch] = useState(""); // Estado para armazenar o texto da busca
  const [pokemon, setPokemon] = useState(null); // Estado para armazenar os dados do Pokémon encontrado
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  // Função assíncrona para buscar o Pokémon da API
  const fetchPokemon = async () => {
    // Verifica se o campo de busca não está vazio
    if (!search.trim()) return;

    try {
      // Realiza a requisição para a API do Pokémon, utilizando o nome ou ID fornecido
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      // Se a resposta não for ok (status diferente de 200), lança um erro
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      // Caso a resposta seja ok, transforma o JSON da resposta em um objeto
      const data = await response.json();
      // Atualiza o estado com os dados do Pokémon encontrado
      setPokemon({
        nome: data.name,
        imagem: data.sprites.front_default,
      tipos: data.types.map((t) => t.type.name).join(", "), // Mapeia os tipos e os junta em uma string separada por vírgulas
      });
      // Limpa a mensagem de erro, se houver
      setError(null);
    } catch (err) {
      // Em caso de erro, define a mensagem de erro e limpa o estado do Pokémon
      setError(err.message);
      setPokemon(null);
    }
  };

  // Função para adicionar o Pokémon aos favoritos
  const adicionarAosFavoritos = () => {
    // Se não houver um Pokémon encontrado, não faz nada
    if (!pokemon) return;
    // Obtém os favoritos do localStorage ou um array vazio se não houver
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Adiciona o Pokémon encontrado aos favoritos
    favoritos.push(pokemon);
    // Salva os favoritos atualizados no localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // Exibe um alerta informando que o Pokémon foi adicionado aos favoritos
    alert("Pokémon adicionado aos favoritos!");
  };

  return (
    <>
      {/* Div que contém o componente Botao */}
      <div className="botao">
        <Botao/>
      </div>

      {/* Div principal contendo os elementos da interface */}
      <div className="container">
        {/* Campo de input para digitar o nome ou ID do Pokémon */}
        <input
          type="text"
          placeholder="Digite o nome ou ID do Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado 'search' conforme o usuário digita
          className="input-field"
        />
        {/* Botão para buscar o Pokémon */}
        <button onClick={fetchPokemon} className="button">
          Buscar Pokémon
        </button>

        {/* Se houver um erro, exibe a mensagem de erro */}
        {error && <p className="error-message">{error}</p>}

        {/* Se um Pokémon for encontrado, exibe suas informações */}
        {pokemon && (
          <div className="pokemon-card">
            <h2>{pokemon.nome.toUpperCase()}</h2> {/* Exibe o nome do Pokémon em maiúsculas */}
            <img src={pokemon.imagem} alt={pokemon.nome} /> {/* Exibe a imagem do Pokémon */}
            <p>Tipo: {pokemon.tipos}</p> {/* Exibe os tipos do Pokémon */}
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
