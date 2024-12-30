import React from "react";
import AsiaMap from "../../components/AsiaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function AsiaCountries() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      mapComponent={AsiaMap}
      quizType="countries"
      title="Asian Countries Quiz"
      mapType="asia"
    />
  );
}

export default AsiaCountries;
