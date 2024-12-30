import React from "react";
import NorthAmericaMap from "../../components/NorthAmericaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function NorthAmericaCountries() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/northamerica"
      mapComponent={NorthAmericaMap}
      quizType="countries"
      title="North American Countries Quiz"
      mapType="northamerica"
    />
  );
}

export default NorthAmericaCountries;
