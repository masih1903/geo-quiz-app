import React from "react";
import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import SouthAmericaMap from "../../components/SouthAmericaMap";

// Define the exact South American countries that are available on the map
const SOUTH_AMERICA_COUNTRIES = [
  'ar', 'bo', 'br', 'cl', 'co', 'ec', 'fk', 'gf', 'gy', 'pe', 'py', 'sr', 'uy', 've'
];

function SouthAmericaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries"
      mapComponent={SouthAmericaMap}
      title="South American Countries Quiz"
      mapType="southamerica"
      countryFilter={(countries) => 
        countries.filter(country => 
          SOUTH_AMERICA_COUNTRIES.includes(country.cca2.toLowerCase())
        )
      }
    />
  );
}

export default SouthAmericaCountries;
