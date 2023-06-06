import React from "react";
import CountryCard from "./CountryCard";
import { connect, useDispatch } from "react-redux";
import {
  sortByName,
  sortByPopulation,
  filterByContinent,
  filterByActivity,
  resetFilters,
} from "../redux/actions";
import styles from "../styles/Home.module.css";

const Home = ({
  onClose,
  filteredCountries,
  onSearch,
  sortByName,
  sortByPopulation,
  filterByContinent,
  filterByActivity,
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

  const handleActivityFilter = (e) => {
    e.preventDefault();
    const activity = e.target.value;
    filterByActivity(activity);
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  };

  const handleSortByPopulation = (e) => {
    e.preventDefault();
    dispatch(sortByPopulation(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
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
    <div className={styles.home}>
      <h1>Paises</h1>

      <div className={styles.searchContainer}>
        <input
          onChange={handleChange}
          onKeyUp={handleEnter}
          type="search"
          placeholder="Buscar un país"
        />
        <button onClick={() => onSearch(name)}>Buscar</button>
      </div>

      <button onClick={handleResetFilters}>Restablecer filtros</button>

      <div className={styles.filterContainer}>
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
          <label>Filtrar por Actividad:</label>
          <select
            onChange={handleActivityFilter}
            name="filter"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Seleccionar actividad
            </option>
            <option value="Senderismo">Senderismo</option>
            <option value="Surf">Surf</option>
            <option value="Esquí">Esquí</option>
            <option value="Buceo">Buceo</option>
            <option value="Observación de aves">Observación de aves</option>
            <option value="Excursiones en bicicleta">Excursiones en bicicleta</option>
            <option value="Turismo gastronómico">Turismo gastronómico</option>
            <option value="Visitas a viñedos">Visitas a viñedos</option>
            <option value="Escalada en roca">Escalada en roca</option>
            <option value="Turismo cultural">Turismo cultural</option>
            <option value="Visitas a monumentos históricos">Visitas a monumentos históricos</option>
            <option value="Turismo de aventura">Turismo de aventura</option>
            <option value="Safari">Safari</option>
            <option value="Kayak">Kayak</option>
            <option value="Yoga y meditación">Yoga y meditación</option>
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

      <div className={styles.countryContainer}>
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
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={currentPage === page ? styles.activePage : ""}
              >
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

const mapDispatchToProps = (dispatch) => ({
  sortByName: (order) => dispatch(sortByName(order)),
  sortByPopulation: (order) => dispatch(sortByPopulation(order)),
  filterByContinent: (continent) => dispatch(filterByContinent(continent)),
  filterByActivity: (activity) => dispatch(filterByActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);