import React from "react";
import EnhancedMapCountryQuiz from "../../components/QuizPages/EnhancedMapCountryQuiz";
import AfricaMap from "../../components/MapComponents/AfricaMap";

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
