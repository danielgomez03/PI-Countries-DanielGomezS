import { SORT_BY_NAME, SORT_BY_POPULATION, ADD_COUNTRY, REMOVE_COUNTRY, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, RESET_FILTERS  } from "./types";

export const addCountry = (country) => ({
    type: ADD_COUNTRY,
    payload: country,
  });

export const removeCountry = (name) => ({
    type: REMOVE_COUNTRY,
    payload: name,
  });

  export const filterByContinent = (continent) => ({
    type: FILTER_BY_CONTINENT,
    payload: continent,
  });

  export const filterByActivity = (activity) => ({
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  });

export const sortByName = (order) => ({
    type: SORT_BY_NAME,
    payload: order,
  });

export const sortByPopulation = (order) => ({
    type: SORT_BY_POPULATION,
    payload: order,
  });

  export const resetFilters = () => ({
    type: RESET_FILTERS,
  });


  