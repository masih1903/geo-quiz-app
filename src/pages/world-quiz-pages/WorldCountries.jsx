import React from "react";
import WorldMap from "../../components/WorldMap"
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function WorldCountries() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries"
      mapComponent={WorldMap}
      quizType="countries"
      title="World Countries Quiz"
      mapType="world"
    />
  );
}

export default WorldCountries;
