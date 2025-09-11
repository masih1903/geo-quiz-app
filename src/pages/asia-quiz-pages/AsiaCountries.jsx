import React from "react";
import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import AsiaMap from "../../components/AsiaMap";

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
