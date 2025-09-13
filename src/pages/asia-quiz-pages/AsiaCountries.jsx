import React from "react";
import EnhancedMapCountryQuiz from "../../components/QuizPages/EnhancedMapCountryQuiz";
import AsiaMap from "../../components/MapComponents/AsiaMap";

function AsiaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      mapComponent={AsiaMap}
      title="Asian Countries Quiz"
      mapType="asia"
    />
  );
}

export default AsiaCountries;
