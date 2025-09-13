import React from "react";
import EnhancedMapCountryQuiz from "../../components/QuizPages/EnhancedMapCountryQuiz";
import NorthAmericaMap from "../../components/MapComponents/NorthAmericaMap";

// Define the exact North American countries that are available on the map
const NORTH_AMERICA_COUNTRIES = [
  'bs', 'bz', 'ca', 'cr', 'cu', 'do', 'gt', 'hn', 'ht', 'jm', 'mx', 'ni', 'pa', 'sv', 'us'
];

function NorthAmericaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries"
      mapComponent={NorthAmericaMap}
      title="North American Countries Quiz"
      mapType="northamerica"
      countryFilter={(countries) => 
        countries.filter(country => 
          NORTH_AMERICA_COUNTRIES.includes(country.cca2.toLowerCase())
        )
      }
    />
  );
}

export default NorthAmericaCountries;
