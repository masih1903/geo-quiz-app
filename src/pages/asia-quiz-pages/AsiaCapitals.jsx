import React from "react";
import AsiaMap from "../../components/AsiaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function AsiaCapitals() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      mapComponent={AsiaMap}
      quizType="capitals"
      title="Asian Capitals Quiz"
      mapType="asia"
    />
  );
}

export default AsiaCapitals;
