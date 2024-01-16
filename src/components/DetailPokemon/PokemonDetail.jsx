import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./pokemonDetail.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ApiService from "../../utils/ApiServices";

AOS.init();

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const GetPokemonData = async () => {
    try {
      const response = await ApiService.get(`/${id}`);
      console.log("ada disini", response.data);
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error", error.message);
    }
  };
  useEffect(() => {
    GetPokemonData();
  }, []);

  // Function untuk Huruf Awal Kapital
  const hurufKapital = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function untuk Huruf Besar Semua
  const hurufBesar = (str) => {
    return str.toUpperCase();
  };

  // Fungsi untuk List Stats
  const renderStatsList = () => (
    <ol className="list-decimal mt-4 ml-10 ">
      {pokemonData.stats.map((stat) => (
        <li key={stat.stat.name}>{renderStatsBar(stat)}</li>
      ))}
    </ol>
  );

  // Fungsi untuk Membuat Grafik Bar
  const renderStatsBar = (stat) => {
    const maxPercentage = 80; // Atur persentase maksimum yang diinginkan

    // Hitung persentase berdasarkan batas maksimum
    const percentage = Math.min((stat.base_stat / 200) * 100, maxPercentage);

    return (
      <div key={stat.stat.name} className="stat-bar">
        <span className="stat-label font-semibold">
          {hurufBesar(stat.stat.name)} :
        </span>
        <div
          className="stat-value text-sm font-normal"
          style={{ width: `${percentage}%` }}
        >
          {stat.base_stat}
        </div>
      </div>
    );
  };

  // Fungsi untuk memunculkan data kemampuan/abilities beserta list abilities yang muncul dari API
  const renderAbilities = () => {
    if (!pokemonData.abilities) return null;

    return (
      <ol className="list-decimal list-inside ml-5">
        {pokemonData.abilities.map((ability) => (
          <li key={ability.ability.name}>
            {hurufKapital(ability.ability.name)}
          </li>
        ))}
      </ol>
    );
  };

  const renderPokemonDetail = () => {
    if (!pokemonData) return null;

    const imageSource =
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonData.id}.gif` ||
      pokemonData.sprites.front_default ||
      pokemonData.sprites.front_shiny ||
      `https://via.placeholder.com/150`;

    return (
      <div data-aos="fade-up" className="pokemon-detail-container">
        <div className="pokemon-detail-header">
          <h1>{hurufKapital(pokemonData.name)}</h1>
          <div className="flex justify-center">
            <img
              src={imageSource}
              alt={hurufKapital(pokemonData.name)}
              style={{
                width: "200px",
                height: "auto",
              }}
            />
          </div>
        </div>
        <div className="pokemon-detail-info">
          <p className="judul1">
            <strong>Abilities:</strong>
          </p>
          <ol className="listAbilities">{renderAbilities()}</ol>
          <p className="judul1">
            <strong>Height:</strong> {pokemonData.height} cm
          </p>
          <p className="judul1">
            <strong>Species:</strong> {hurufKapital(pokemonData.species.name)}
          </p>
          <p className="judul1">
            <strong>Stats:</strong>
          </p>
          {renderStatsList()}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="judul">
        <h1 className="text-3xl">Pokemon Species Detail</h1>
      </div>

      {renderPokemonDetail()}
    </div>
  );
};

export default PokemonDetail;
