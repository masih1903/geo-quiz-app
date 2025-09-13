import React from "react";
import EnhancedMapCountryQuiz from "../../components/QuizPages/EnhancedMapCountryQuiz";
import EuropeMap from "../../components/MapComponents/EuropeMap";

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
