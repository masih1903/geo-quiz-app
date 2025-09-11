import React from "react";
import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import SouthAmericaMap from "../../components/SouthAmericaMap";

function SouthAmericaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/americas"
      mapComponent={SouthAmericaMap}
      title="South American Countries Quiz"
      mapType="southamerica"
    />
  );
}

export default SouthAmericaCountries;
