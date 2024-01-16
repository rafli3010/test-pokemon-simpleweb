import { useState, useEffect } from "react";
// import "./pokemonList.css"; // Import the CSS file
import ApiService from "../../utils/ApiServices";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // function mengambil data dari API Services
  const GetPokemonData = async () => {
    try {
      const response = await ApiService.get("?limit=1000");
      console.log("ada disini", response.data.results);
      const sortedPokemonList = response.data.results.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPokemonList(sortedPokemonList);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  useEffect(() => {
    GetPokemonData();
  }, []);

  // Function Pencarian Data Species
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Function untuk Huruf Besar Semua
  const hurufBesar = (str) => {
    return str.toUpperCase();
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemonList = filteredPokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function Untuk Page Number
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPokemonList.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="pageTitle mb-4">
        <h1 className="text-3xl flex justify-center">Pokemon List</h1>
      </div>

      <div className="search-container mb-20 text-center">
        <input
          type="text"
          placeholder="Search Species Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded flex items-center"
        />
      </div>

      <ul className="pokemon-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 font-serif">
        {currentPokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            className="bg-indigo-200 p-4 rounded transition-transform duration-300 hover:scale-105 flex justify-center"
          >
            <a href={`/pokemon/${pokemon.name}`} className="text-indigo-700">
              {hurufBesar(pokemon.name)}
            </a>
          </li>
        ))}
      </ul>

      <div className="pagination mt-4 text-sm md:text-base lg:text-lg flex flex-wrap justify-center">
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={`inline-block mx-1 md:mx-2 lg:mx-3 text-wrap mb-5 justify-center items-center border ${
              number === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-gray-400"
            } px-2 py-1 cursor-pointer rounded`}
            onClick={() => paginate(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
