import React from "react";
import EnhancedMapCountryQuiz from "../../quizTypes/EnhancedMapCountryQuiz";
import AfricaMap from "../../components/mapComponents/AfricaMap";

function AfricaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/africa"
      mapComponent={AfricaMap}
      title="African Countries Quiz"
      mapType="africa"
    />
  );
}

export default AfricaCountries;
