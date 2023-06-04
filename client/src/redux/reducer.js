import { SORT_BY_NAME, SORT_BY_POPULATION, ADD_COUNTRY, REMOVE_COUNTRY, FILTER_BY_CONTINENT } from "./types";

const initialState = {
  allCountries: [], // Lista completa de países
  filteredCountries: [], // Lista de países filtrados
  sortOrder: "", // Orden actual: 'asc' o 'desc'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return {
        ...state,
        allCountries: [...state.allCountries, action.payload],
        filteredCountries: [...state.allCountries, action.payload], // Agregar el país a la lista filtrada
      };

    case REMOVE_COUNTRY:
      const filteredCountries = state.allCountries.filter(
        (country) => country.name !== action.payload
      );
      return {
        ...state,
        allCountries: filteredCountries,
        filteredCountries, // Actualizar la lista filtrada
      };

    case FILTER_BY_CONTINENT:
      const filteredByContinent = state.allCountries.filter(
        (country) => country.continent === action.payload
      );
      return {
        ...state,
        filteredCountries: filteredByContinent, // Actualizar la lista filtrada
      };

    case SORT_BY_NAME:
      const sortedByName = [...state.filteredCountries].sort((a, b) => {
        if (action.payload === "asc") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "desc") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      return {
        ...state,
        filteredCountries: sortedByName, // Actualizar la lista filtrada
        sortOrder: action.payload,
      };

    case SORT_BY_POPULATION:
      const sortedByPopulation = [...state.filteredCountries].sort((a, b) => {
        if (action.payload === "asc") {
          return a.population - b.population;
        } else if (action.payload === "desc") {
          return b.population - a.population;
        }
        return 0;
      });
      return {
        ...state,
        filteredCountries: sortedByPopulation, // Actualizar la lista filtrada
        sortOrder: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;