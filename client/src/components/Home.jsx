import React from "react";
import CountryCard from "./CountryCard";
import { connect, useDispatch } from "react-redux";
import {
  sortByName,
  sortByPopulation,
  filterByContinent,
} from "../redux/actions";

const Home = ({
  onClose,
  filteredCountries,
  onSearch,
  sortByName,
  sortByPopulation,
  filterByContinent,
}) => {
  const [name, setName] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const countriesPerPage = 10;

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      onSearch(name);
      setName("");
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const dispatch = useDispatch();

  const handleContinentFilter = (e) => {
    e.preventDefault();
    const continent = e.target.value;
    filterByContinent(continent);
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  };

  const handleSortByPopulation = (e) => {
    e.preventDefault();
    dispatch(sortByPopulation(e.target.value));
  };

  const paginate = (array) => {
    const startIndex = (currentPage - 1) * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    return array.slice(startIndex, endIndex);
  };

  const paginatedCountries = paginate(filteredCountries);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Paises</h1>

      <div>
        <input
          onChange={handleChange}
          onKeyUp={handleEnter}
          type="search"
          placeholder="Buscar un país"
        />
        <button onClick={() => onSearch(name)}>Buscar</button>
      </div>

      <div>
        <div>
          <label>Filtrar por continente:</label>
          <select
            onChange={handleContinentFilter}
            name="filter"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Seleccionar filtro
            </option>
            <option value="Asia">Asia</option>
            <option value="Africa">África</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
            <option value="Americas">Américas</option>
          </select>
        </div>

        <div>
          <label>Ordenar por nombre:</label>
          <select
            onChange={handleSortByName}
            name="filter"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Seleccionar filtro
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div>
          <label>Ordenar por población:</label>
          <select
            onChange={handleSortByPopulation}
            name="filter"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Seleccionar filtro
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <div>
        {paginatedCountries &&
          paginatedCountries.map((country, index) => {
            return (
              <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                continent={country.continent}
                capital={country.capital}
                subregion={country.subregion}
                area={country.area}
                image={country.image}
                population={country.population}
                onClose={onClose}
              />
            );
          })}
      </div>

      {totalPages > 1 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button key={page} onClick={() => goToPage(page)}>
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredCountries: state.filteredCountries,
  };
};

const mapDispatchToProps = {
  sortByName,
  sortByPopulation,
  filterByContinent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);