// API Configuration Constants
export const API_BASE_URL = 'https://atlasapi.cphmk.dk/api/countries';

export const API_ENDPOINTS = {
  world: `${API_BASE_URL}`,
  europe: `${API_BASE_URL}/region/europe`,
  asia: `${API_BASE_URL}/region/asia`,
  africa: `${API_BASE_URL}/region/africa`,
  northAmerica: `${API_BASE_URL}/region/americas`,
  southAmerica: `${API_BASE_URL}/region/americas`,
};

export const QUIZ_TYPES = {
  CAPITAL: 'capital',
  COUNTRY: 'country',
  FLAG: 'flag',
};

export const CONTINENT_NAMES = {
  WORLD: 'World',
  EUROPE: 'Europe',
  ASIA: 'Asia',
  AFRICA: 'Africa',
  NORTH_AMERICA: 'North America',
  SOUTH_AMERICA: 'South America',
};
