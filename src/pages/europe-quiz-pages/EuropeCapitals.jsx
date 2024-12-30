import React from "react";
import EuropeMap from "../../components/EuropeMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function EuropeCapitals() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/europe"
      mapComponent={EuropeMap}
      quizType="capitals"
      title="European Capitals Quiz"
      mapType="europe"
    />
  );
}

export default EuropeCapitals;
