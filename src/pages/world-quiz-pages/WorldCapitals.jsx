import React from "react";
import WorldMap from "../../components/WorldMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function WorldCapitals() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries"
      mapComponent={WorldMap}
      quizType="capitals"
      title="World Capitals Quiz"
      mapType="world"
    />
  );
}

export default WorldCapitals;
