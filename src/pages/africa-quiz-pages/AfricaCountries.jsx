import React from "react";
import AfricaMap from "../../components/AfricaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function AfricaCountries() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/africa"
      mapComponent={AfricaMap}
      quizType="countries"
      title="African Countries Quiz"
      mapType="africa"
    />
  );
}

export default AfricaCountries;
