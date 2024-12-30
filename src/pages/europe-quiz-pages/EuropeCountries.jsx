import React from "react";
import EuropeMap from "../../components/EuropeMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function EuropeCountries() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/europe"
      mapComponent={EuropeMap}
      quizType="countries"
      title="European Countries Quiz"
      mapType="europe"
    />
  );
}

export default EuropeCountries;
