import { SORT_BY_NAME, SORT_BY_POPULATION, ADD_COUNTRY, REMOVE_COUNTRY, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, RESET_FILTERS } from "./types";

const initialState = {
  allCountries: [], 
  filteredCountries: [], 
  sortOrder: "", 
  activities: [], 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return {
        ...state,
        allCountries: [...state.allCountries, action.payload],
        filteredCountries: [...state.allCountries, action.payload], 
      };

      case REMOVE_COUNTRY:
        const filteredAllCountries = state.allCountries.filter(
          (country) => country.name !== action.payload
        );
        const filteredFilteredCountries = state.filteredCountries.filter(
          (country) => country.name !== action.payload
        );
        return {
          ...state,
          allCountries: filteredAllCountries,
          filteredCountries: filteredFilteredCountries,
        };

      case RESET_FILTERS:
          return {
            ...state,
            filteredCountries: state.allCountries,
            sortOrder: "",
          };

    case FILTER_BY_CONTINENT:
      const filteredByContinent = state.allCountries.filter(
        (country) => country.continent === action.payload
      );
      return {
        ...state,
        filteredCountries: filteredByContinent, 
      };

      case FILTER_BY_ACTIVITY:
        const filteredByActivity = state.allCountries.filter((country) =>
          country.activities.some((activity) => activity.name === action.payload)
        );
        return {
          ...state,
          filteredCountries: filteredByActivity,
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
        filteredCountries: sortedByName, 
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
        filteredCountries: sortedByPopulation, 
        sortOrder: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;