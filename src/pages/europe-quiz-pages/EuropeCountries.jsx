import React from "react";
import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import EuropeMap from "../../components/EuropeMap";

function EuropeCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/europe"
      mapComponent={EuropeMap}
      title="European Countries Quiz"
      mapType="europe"
    />
  );
}

export default EuropeCountries;
