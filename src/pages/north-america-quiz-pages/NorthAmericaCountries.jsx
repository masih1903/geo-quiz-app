import React from "react";
import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import NorthAmericaMap from "../../components/NorthAmericaMap";

function NorthAmericaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/americas"
      mapComponent={NorthAmericaMap}
      title="North American Countries Quiz"
      mapType="northamerica"
    />
  );
}

export default NorthAmericaCountries;
